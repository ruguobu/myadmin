<template>
    <!-- 修改标签dialog -->
    <el-dialog
      v-model="visible"
      title="修改标签"
      width="30%"
      center
    >
      <el-input v-model="dataForm.name" placeholder="请输入标签名" clearable />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close()">取消</el-button>
          <el-button type="primary" @click="createOrUpdateMate"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 修改标签dialog结束 -->
</template> 

<script>
import { toRefs, reactive } from 'vue'

export default{
    name: "VideoEditor",
    props:{
        onCreate: Function,
        onUpdate: Function,
    },
    setup(){
        const state = reactive({
            dataForm:{
                name: ""
            },
            visible: false,
            editType: 1, //1为新增 2为修改
        })

        // 打开弹出框【用于编辑标签资源】
        const open = (mateObj)=>{
            state.visible = true
            if(!mateObj){
                state.dataForm.name = ""
                state.editType = 1
            }else{
                state.editType = 2
                state.dataForm = {...mateObj}
            }
        }

        // 关闭弹出框
        const close = ()=>{
            state.dataForm.name = ""
            state.visible = false
        }

        // 增加或修改数据
        const createOrUpdateMate = ()=>{
            // 创建
            if(state.editType == 1){
                if(props.onCreate){
                    props.onCreate(state.dataForm)
                }
            }
            // 修改
            else{ 
                if(props.onUpdate){
                    props.onUpdate(state.dataForm)
                }
            }
        }

        return{
            ...toRefs(state),
            open,
            close,
            createOrUpdateMate,
        }

    }
}
</script>

    