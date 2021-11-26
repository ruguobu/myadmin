<template>
    <el-upload
        :action="uploadUrl"
        :on-change="handChange"
    >
    <el-button >点击上传资源</el-button>
    </el-upload>
</template>

<script>
import { reactive, toRefs } from "vue";
import axios from 'axios'
import { ElMessage, ElMessageBox } from "element-plus";



export default {
name: "ZhztResUpload",
props:{
    onUploadSuccess:Function,
},
setup(props) {
    console.log('----setup----',props)
    const state = reactive({
        dialogImgeUrl: "",
        dialogVisible: false,
        uploadUrl:"http://10.10.1.168:8070/api/File/upload",
    });
    const handChange = (file) => {///api/File/checkSignal/{md5Signal}
        if(1==1){
            md5check(file)

        }else {
            props.onUploadSuccess(file)
        }
    }


    const md5check = (file)=>{
        let res = axios.get(`http://10.10.1.168:vapi/File/upload/${file.md5Signal}`)
        consle.log(res)
        if(!res.success){
             ElMessage.success("文件已经存在了")
        }
    }
    return {
        handChange,

        ...toRefs(state)
    };
},
};
</script>