<template>
  <!-- 搜索组件开始 -->
  <ZhztTextSearch :search="searchData" />
  <!-- 搜索组件结束 -->

  <!-- 数据展示组件开始 -->
  <VideoList :onRowEdit="openEditor" :onRowDelete="deleteOne"/>
  <!-- 数据展示组件结束 -->

  <!-- 分页组件开始 -->
  <ZhztPagination/>
  <!-- 分页组件结束 -->

  <!-- 视频编辑器开始 -->
  <VideoEditor ref="videoEditorRef"/>
  <!-- 视频编辑器结束 -->
</template>

<script>
import { reactive , ref } from "vue";
import ZhztTextSearch from "../../components/Common/ZhztTextSearch.vue";
import VideoList from "../../components/DataTables/VideoList.vue"
import ZhztPagination from "../../components/Common/ZhztPagination.vue"
import VideoEditor from "../../components/Editors/VideoEditor.vue"
export default {
  name: "VideoManagement",
  components: {
    ZhztTextSearch,
    VideoList,
    ZhztPagination,
    VideoEditor
  },
  setup() {
    const state = reactive({
      queryKey: "",
      count: 1,
    });


    const videoEditorRef = ref(null)

    // 搜索数据
    const searchData = (queryKey) => {
      console.log(queryKey);
      state.queryKey = queryKey;
      // updateData();
    };

    //删除单行
    const deleteOne = (mateId )=>{
      console.log(mateId)
    }

    //打开创建标签的Editor
    const openEditor = (mateObj)=>{
      console.log(videoEditorRef)
      videoEditorRef.value.open(mateObj)
    }

    return {
      searchData,
      videoEditorRef,
      openEditor,
      deleteOne
    };
  },
};
</script>

<style lang="scss" scoped>
</style>