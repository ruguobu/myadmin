<template>
  <el-button type="danger" icon="el-icon-remove" @click="deleteMany">批量删除</el-button>
  <el-button type="primary" icon="el-icon-plus" @click="openEditor()">新建标签</el-button>
  
  <!-- 试题table表格列表开始 -->
  <TestList ref="testListRef" :onRowDelete="deleteOne" :onRowEdit="openEditor"/>
  <!-- 试题table表格列表结束 -->

  <!-- 试题编辑dialog弹出框组开始 -->
  <TestEditor ref="testEditorRef"/>
</template>

<script>
import TestList from "../../components/DataTables/TestList.vue";
import TestEditor from "../../components/Editors/TestEditor.vue";
import { ref } from "vue";
export default {
  name: "TestManagement",
  components: {
    TestList,
    TestEditor,
  },
  setup() {
    const testListRef = ref(null);
    const testEditorRef = ref(null);

    //批量删除标签
    const deleteMany = () => {
      console.log(testListRef.value.selectedIds);
    };

    //单个删除，使用子组件执行父组件方法将ID传过来
    const deleteOne = (id) => {
        console.log(id)
    };

    //打开创建标签的Editor
    console.log(testEditorRef)
    const openEditor = (testObj)=>{
      console.log(testEditorRef,'ahahh-----')
      testEditorRef.value.open(testObj)
    }

    return {
      testListRef,
      testEditorRef,
      deleteMany,
      deleteOne,
      openEditor
    };
  },
};
</script>