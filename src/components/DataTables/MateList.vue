
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
       <el-table-column align="center" property="" label="标签" show-overflow-tooltip>
            <template #default="scope">
                <el-tag type="info" v-for="(item,index) in scope.row.mates" :key="index">
                    {{item}}
                </el-tag>
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
import {ref, reactive, toRefs, watch} from "vue";
export default {
  name: "MateList",
  props:{
    onRowEdit: Function,
    onRowDelete: Function,
    tableData: Array,
  },
  setup(props) {
    const state = reactive({
      selectedIds : [],
      tableData: [],
    })

    watch(props.tableData, (_,newer)=>{
      state.tableData = newer
    })
    

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
      handleDelete,
      handleEdit,
      handleSelectionChange,
    };

  },
};
</script>