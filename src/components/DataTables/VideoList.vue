<template>
  <!-- <h2>{{ count }}</h2> -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="名称" width="120">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="" label="点击率" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.clickRate }}</template>
      </el-table-column>
      <el-table-column property="" label="发布时间" show-overflow-tooltip>
        <template #default="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column property="" label="状态" show-overflow-tooltip>
        <template #default="scope">
            <el-tag type="info" v-show="scope.row.status == 'deleted'">未启用</el-tag>
            <el-tag type="success" v-show="scope.row.status == 'using'">使用中</el-tag>
        </template>
      </el-table-column>
      <el-table-column property="" label="操作">
        <template #default="scope">
          <el-button type="primary"  size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger"  size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
import {ref, reactive, toRefs} from "vue";
export default {
  name: "VideoList",
  props:{
    onRowEdit: Function,
    onRowDelete: Function,
  },
  setup(props) {
    const state = reactive({
      selectedIds : []
    })

    const tableData = [
      {
        id : 1,
        clickRate:8,
        createTime: "2016-05-03",
        name: "zhang",
        address: "No. 189, Grove St, Los Angeles",
        status: "deleted"
      },
      {
        id : 11,
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
        status: "deleted"
      },
      {
        id : 21,
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
        status: "using"
      },
      {
        id : 21,
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        id : 21,
        date: "2016-05-08",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        id : 21,
        date: "2016-05-06",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        id : 21,
        date: "2016-05-07",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];

    // 编辑事件
    const handleEdit = (mateObj)=>{
      console.log(props)
      if(props.onRowEdit){
        props.onRowEdit(mateObj)
      }
    }

    // 删除事件
    const handleDelete = (row)=>{
      if(props.onRowDelete){
        props.onRowDelete(row.id)
      }
    }

    // 选择事件
    const handleSelectionChange = (selection)=>{
      console.log(selection)
      // TODO selection 转 id数组
      state.selectedIds = selection.map(item=>item.id)
    }

    return {
      ...toRefs(state),
      tableData,
      centerDialogVisible: ref(false),
      handleDelete,
      handleEdit,
      handleSelectionChange,
    };

  },
};
</script>
