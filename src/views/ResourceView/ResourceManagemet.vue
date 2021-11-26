<template>
  <el-card class="introduce">
    <!--头部信息【操作按钮，数据检索表单】-->
    <div class="header">
      <!-- 搜索组件开始 -->
      <div class="search"><ResourceSearch :search="searchData" :mates="allMates" /></div>
      <!-- 搜索组件结束 -->
      <el-button
          type="danger"
          icon="el-icon-remove"
          @click="deleteMany()">批量删除</el-button
        >
      <el-button
        class="newbutton"
        type="primary"
        icon="el-icon-plus"
        @click="openEditor()"
        >新建资源</el-button
      >

    </div>

    <!-- 资源管理的数据列表组件开始 -->
    <ResourceList
      ref="resourceListRef"
      :tableData="resourceData"
      :onRowEdit="openEditor"
      :onRowDelete="deleteOne"
      
    />
    <!-- 资源管理的数据列表组件结束 -->

    <!--通用分页组件-->
    <ZhztPagination
      :updateData="updateData"
      :toalDataCount="totalDataCount"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :totalCount="totalCount"
    />
    <!--通用分页组件结束-->

    <!-- 新建资源editor开始 -->
    <ResourceEditor
      ref="resourceEditorRef"
      :onCreate="handleCreateResource"
      :onUpdate="handleUpdateResource"
      :mates="allMates"
    />
    <!-- 新建资源editor结束 -->
  </el-card>
</template>

<script>
import ResourceSearch from "../../components/Search/ResourceSearch.vue";
import ResourceList from "../../components/DataTables/ResourceList.vue";
import ZhztPagination from "@/components/Common/ZhztPagination.vue";
import ResourceEditor from "../../components/Editors/ResourceEditor.vue";
import {
  loadResources,
  createResource,
  deleteOneResourceById,
  getAllMate,
  deleteManyResourceByIds,
  updateResource
} from "@/api";
import { onMounted, reactive, toRefs, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import GlobalValue from "@/config/settings";

export default {
  name: "ResourceManagemet",
  components: {
    ResourceSearch,
    ResourceList,
    ZhztPagination,
    ResourceEditor
  },

  setup() {
    //这是一个管理组件，现在开始设置管理的内容
    const state = reactive({
      queryKey: "",
      totalCount: 1,
      totalPage: 1,
      currentPage: 1,
      pageSize: 15,
      resourceData: [],
      allMates: [],
    });

    const resourceEditorRef = ref(null);
    const resourceListRef = ref(null);

    // 挂载后立马加载数据
    onMounted(() => {
      updateData(
        GlobalValue.paginationSettings.page,
        GlobalValue.paginationSettings.pageSize
      );
      queryAllMates()
    });

    //获取所有标签
    const queryAllMates = async () => {
      let res = await getAllMate();
      state.allMates = res;
    };

    // 更新数据
    const updateData = async (page, pageSize) => {
      let res = await loadResources(page, pageSize, state.queryKey);
      console.log(res,'这是资源')
      state.resourceData = res.data;
      state.totalCount = parseInt(res.totalCount);
      state.currentPage = res.currentPage;
      state.pageSize = res.pageSize;
    };

    // 搜索数据
    const searchData = (queryKey) => {
      console.log(queryKey);
      state.queryKey = queryKey;
      updateData();
    };



    //打开创建标签的Editor
    const openEditor = (mateObj) => {
      console.log(resourceEditorRef)
      console.log(mateObj,)
      resourceEditorRef.value.open(mateObj);
    };

    //删除一个的资源
    const deleteOne = (id) => {
      console.log(id);
      ElMessageBox.confirm(
        "确定删除此标签吗？删除后可能影响系统正常运行?",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          // TODO 调用删除API
          let res = await deleteOneResourceById(id);
          if (res) {
            updateData(state.currentPage, state.pageSize);
            ElMessage.success("删除数据成功！");
          } else {
            ElMessage.error("删除数据失败");
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };

    // 批量删除标签
    const deleteMany = ()=>{
      console.log(resourceListRef.value.selectedIds)
       if(resourceListRef.value.selectedIds.length < 1){
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
            let res = await deleteManyResourceByIds(resourceListRef.value.selectedIds)
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


    //新建资源
    const handleCreateResource = async (resObj) => {
      let res = await createResource(resObj);
      if (res) {
        // 如果成功了，弹出提示框添加成功；关闭弹出框；更新数据
        resourceEditorRef.value.close();
        ElMessage.success("数据已成功添加！");
        updateData(state.currentPage, state.pageSize);
      } else {
        //失败了
        resourceEditorRef.value.close();
        ElMessage.error("数据添加失败");
      }
    };

    // 修改标签
    const handleUpdateResource = async (mateobj) => {
      let res = await updateResource(mateobj);
      console.log(res);
      if (res) {
        // 如果成功了，弹出提示框修改成功；关闭弹出框；更新数据
        resourceEditorRef.value.close();
        ElMessage.success("数据修改成功！");
        updateData(state.currentPage, state.pageSize);
      } else {
        //失败了
        resourceEditorRef.value.close();
        ElMessage.error("数据修改失败");
      }
    };

    return {
      searchData,
      openEditor,
      deleteOne,
      updateData,
      handleCreateResource,
      deleteMany,
      queryAllMates,
      resourceEditorRef,
      resourceListRef,
      handleUpdateResource,
      ...toRefs(state),
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
  .search {
    flex: 1;
  }
  .newbutton {
    margin-left: 150px;
  }
}
</style>
