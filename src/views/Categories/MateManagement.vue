<template>
  <el-card class="introduce">
    <!--头部信息【操作按钮，数据检索表单】-->
    <div class="header">
      <div><ZhztTextSearch :search="searchData"/></div>
      <div>
        <el-button
          type="danger"
          icon="el-icon-remove"
          @click="deleteMany()">批量删除</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="openEditor()">新建标签</el-button
        >
      </div>
    </div>
    <!--头部信息结束-->

    <!--数据列表组件-->
    <MateList ref="mateListRef" :tableData="mateData" :onRowEdit="openEditor" :onRowDelete="deleteOne"/>
    <!--数据列表组件结束-->

    <!--通用分页组件-->
    <ZhztPagination :updateData="updateData" :toalDataCount="totalDataCount" :currentPage="currentPage" :pageSize="pageSize" :totalCount="totalCount" />
    <!--通用分页组件结束-->
    
    <!-- 新建标签dialog -->
    <MateEditor ref="mateEditorRef" :onCreate="handleCreateMate" :onUpdate="handleUpdateMate"/>
    <!-- 新建标签dialog结束 -->
  </el-card>
</template>
<script>
import MateList from "@/components/DataTables/MateList.vue";
import ZhztPagination from "@/components/Common/ZhztPagination.vue";
import ZhztTextSearch from "../../components/Common/ZhztTextSearch.vue";
import MateEditor from "@/components/Editors/MateEditor.vue"
import { loadMates, createMate ,updateMate ,deleteOneMateById, deleteManyMatesByIds} from "@/api";
import { onMounted, ref, reactive, toRefs } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import GlobalValue from "@/config/settings";

export default {
  name: "MateManagement",
  components: {
    MateList,
    ZhztPagination,
    ZhztTextSearch,
    MateEditor,
  },

  setup() {
    // 这是一个管理组件，现在开始设置管理的内容
    const state = reactive({
      queryKey: "",
      totalCount: 1,
      totalPage: 1,
      currentPage: 1,
      pageSize: 15,
      mateData: []
    });

    const mateEditorRef = ref(null)
    const mateListRef = ref(null)
    
    // 挂载后立马加载数据
    onMounted(() => {
      updateData(GlobalValue.paginationSettings.page, GlobalValue.paginationSettings.pageSize);
    });

    // 更新数据
    const updateData = async (page, pageSize) => {
      let res = await loadMates(page, pageSize, state.queryKey);
      console.log(res,"---------------")
      state.mateData = res.data;
      state.totalCount = parseInt(res.totalCount);
      state.currentPage = res.currentPage;
      state.pageSize = res.pageSize;
    };     


    // 搜索数据
    const searchData = (queryKey) => {
      console.log(queryKey)
      state.queryKey = queryKey;
      updateData();
    };

    //新建标签
    const handleCreateMate = async (mateObj)=>{
        console.log("标签名")
        let res = await createMate(mateObj)
				if(res){
					// 如果成功了，弹出提示框添加成功；关闭弹出框；更新数据
					mateEditorRef.value.close()
					ElMessage.success("数据已成功添加！")
					updateData(state.currentPage, state.pageSize);
				}else{
					//失败了
					mateEditorRef.value.close()
					ElMessage.error("数据添加失败")
				}
    }

		// 修改标签
		const handleUpdateMate = async(mateobj)=>{
			let res = await updateMate(mateobj)
			console.log(res)
				if(res){
					// 如果成功了，弹出提示框修改成功；关闭弹出框；更新数据
					mateEditorRef.value.close()
					ElMessage.success("数据修改成功！")
					updateData(state.currentPage, state.pageSize);
				}else{
					//失败了
					mateEditorRef.value.close()
					ElMessage.error("数据修改失败")
				}
		}
    
    //删除标签
    const deleteOne =  (id)=>{
        ElMessageBox.confirm(
          '确定删除此标签吗？删除后可能影响系统正常运行?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        .then(async() => {
            // TODO 调用删除API
						let res = await deleteOneMateById(id)
						if(res){
							updateData(state.currentPage, state.pageSize)
							ElMessage.success("删除数据成功！")
						}else{
							ElMessage.error("删除数据失败")
						}
        })
        .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消删除',
            })
        })
    }

    // 批量删除标签
    const deleteMany = ()=>{
      console.log(mateListRef.value.selectedIds)
      if(mateListRef.value.selectedIds.length < 1){
        ElMessage.info("您没有选择任何数据！")
      }else{
        ElMessageBox.confirm(
          '确定批量删除标签吗？删除后可能影响系统正常运行?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
				.then(async () => {
            // TODO 调用删除API
            let res = await deleteManyMatesByIds(mateListRef.value.selectedIds)
						if(res){
							updateData(state.currentPage, state.pageSize)
							ElMessage.success("删除数据成功！")
						}else{
							ElMessage.error("删除数据失败")
						}
          })
				.catch((e) => {
					console.log(e)
					ElMessage({
						type: 'info',
						message: '已取消删除',
					})
				})
      }
    }

    //打开创建标签的Editor
    const openEditor = (mateObj)=>{
      console.log(mateEditorRef)
      mateEditorRef.value.open(mateObj)
    }

    return {
      ...toRefs(state),
      updateData,
      searchData,
      openEditor,
			handleCreateMate,
      deleteOne,
      deleteMany,
      mateEditorRef,
      mateListRef,
			handleUpdateMate
    };
  },
};
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  // background-color: plum;
}
</style>