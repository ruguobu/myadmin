<template>
  <el-card>
    <!--头部信息【操作按钮，数据检索表单】-->
    <div class="header">
      <div><ZhztTextSearch :search="searchData" /></div>
      <div>
        <el-button type="danger" icon="el-icon-remove" @click="deleteMany()"
          >批量删除</el-button
        >
        <el-button type="primary" icon="el-icon-plus" @click="openEditor()"
          >新建分类</el-button
        >
      </div>
    </div>
    <!--头部信息结束-->
    <!-- 数据列表组件开始 -->
    <CategoryList
      ref="categoryListRef"
      :tableData="categoryData"
      :onRowEdit="openEditor"
      :onRowDelete="deleteOne"
    />
    <!-- 数据列表组件开始 -->

    <!-- 通用分页组件 -->
    <ZhztPagination :updateData="updateData" :toalDataCount="totalDataCount" />
    <!-- 通用分页组件 -->

    <!-- 新建标签dialog -->
    <CategoryEditor
      ref="categoryEditorRef"
      :onCreate="handleCreateGategory"
      :onUpdate="handleUpdateGategory"
      :mates = "allMates"
    />
    <!-- 新建标签dialog结束 -->
  </el-card>
</template>

<script>
import { ref, reactive, toRefs, onMounted, } from "vue";
import CategoryList from "@/components/DataTables/CategoryList.vue";
import ZhztTextSearch from "@/components/Common/ZhztTextSearch.vue";
import CategoryEditor from "@/components/Editors/CategoryEditor.vue";
import ZhztPagination from "@/components/Common/ZhztPagination.vue";
import {
  loadCategory,
  createGategory,
  updateGategory,
  deleteOneGategoryById,
  deleteManyGategorysByIds,
  getAllMate,
} from "@/api";
import GlobalValue from "@/config/settings";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "CategoriesManagement",
  components: {
    ZhztTextSearch,
    CategoryList,
    CategoryEditor,

    ZhztPagination,
  },
  setup() {
    // 这是一个管理组件，现在开始设置管理的内容
    const state = reactive({
      queryKey: "",
      totalCount: 1,
      totalPage: 1,
      currentPage: 1,
      pageSize: 15,
      categoryData: [],
      allMates: [],
    });

    const categoryEditorRef = ref(null);
    const categoryListRef = ref(null);

    // 挂载后立马加载数据
    onMounted(() => {
      updateData(
        GlobalValue.paginationSettings.page,
        GlobalValue.paginationSettings.pageSize
      );
      queryAllMates();
    });

    //获取所有标签
    const queryAllMates = async () => {
      let res = await getAllMate();
      state.allMates = res;
    };

    // 更新数据
    const updateData = async (page, pageSize) => {
      let res = await loadCategory(page, pageSize, state.queryKey);
      console.log(res.data, "---------------");
      // 根据返回判断数据状态
      // 如果成功
      state.categoryData = res.data;
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

    //新建分类
    const handleCreateGategory = async (mateObj) => {
      console.log("标签名");
      let res = await createGategory(mateObj);
      if (res) {
        // 如果成功了，弹出提示框添加成功；关闭弹出框；更新数据
        categoryEditorRef.value.close();
        ElMessage.success("数据已成功添加！");
        updateData(state.currentPage, state.pageSize);
      } else {
        //失败了
        categoryEditorRef.value.close();
        ElMessage.error("数据添加失败");
      }
    };

    // 修改分类
    const handleUpdateGategory = async (mateobj) => {
      let res = await updateGategory(mateobj);
      console.log(res);
      if (res) {
        // 如果成功了，弹出提示框修改成功；关闭弹出框；更新数据
        categoryEditorRef.value.close();
        ElMessage.success("数据修改成功！");
        updateData(state.currentPage, state.pageSize);
      } else {
        //失败了
        categoryEditorRef.value.close();
        ElMessage.error("数据修改失败");
      }
    };

    //删除单行
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
          let res = await deleteOneGategoryById(id);
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

    //批量删除
    const deleteMany = () => {
      console.log(categoryListRef.value.selectedIds);
       if(categoryListRef.value.selectedIds.length < 1){
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
            let res = await deleteManyGategorysByIds(categoryListRef.value.selectedIds)
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
    };

    //打开创建标签的Editor
    const openEditor = (mateObj) => {
      console.log("----hahha----", mateObj);
      categoryEditorRef.value.open(mateObj);
    };

    return {
      searchData,
      deleteOne,
      deleteMany,
      openEditor,
      categoryEditorRef,
      categoryListRef,
      updateData,
      queryAllMates,
      handleCreateGategory,
      handleUpdateGategory,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  // background-color: plum;
}
</style>