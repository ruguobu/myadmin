<template>
  <!-- 修改标签dialog -->
  <el-dialog v-model="visible" title="修改资源" width="30%" center>
    <el-form :rules="rules" :model="dataForm" ref="resourceForm" label-position="left" label-width="56px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model.trim="dataForm.name"
          placeholder="请输入资源名"
          clearable
        />
      </el-form-item>
      <el-form-item label="资源">
        <ZhztResUpload :onUploadSuccess="onUploadResourceSuccess" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="dataForm.resourceType" placeholder="请选择文件类型">
          <el-option label="文档" value="doc"></el-option>
          <el-option label="视频" value="mp4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签名">
        <el-select v-model="dataForm.mates" multiple placeholder="请选择标签名">
          <el-option
            v-for="mateName in allMates"
            :key="mateName"
            :label="mateName"
            :value="mateName"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="createOrUpdateMate">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改标签dialog结束 -->
</template> 

<script>
import { toRefs, reactive, watch, ref } from "vue";
import ZhztResUpload from "../../components/Common/ZhztResUpload.vue";
export default {
  name: "ResourceEditor",
  components: {
    ZhztResUpload,
  },
  props: {
    onCreate: Function,
    onUpdate: Function,
    mates: Array,
  },
  setup(props) {
    const resourceForm = ref(null);
    const state = reactive({
      dataForm: {
        name: "",
        url: "",
        resourceType: "",
        resourceId: null,
        clickRate: 0,
        mates: [],
      },
      rules: {
        name: [
          { required: "true", message: "标签名不能为空", trigger: "blur" },
        ],
      },
      allMates: [],
      visible: false,
      editType: 1, //1为新增 2为修改
    });

    watch(props, (_, newer) => {
      state.allMates = newer.mates.map((a) => a.name);
    });

    // 打开弹出框【用于编辑标签资源】
    const open = (mateObj) => {
      state.visible = true;
      if (!mateObj) {
        state.dataForm.name = "";
        state.editType = 1;
      } else {
        state.editType = 2;
        state.dataForm = { ...mateObj };
      }
    };

    // 关闭弹出框
    const close = () => {
      state.dataForm.name = "";
      state.visible = false;
    };

    // 增加或修改数据
    const createOrUpdateMate = () => {
      resourceForm.value.validate((valid) => {
         // 创建
      if (state.editType == 1) {
        if (props.onCreate) {
          console.log("creat");
          props.onCreate(state.dataForm);
        }
      }
      // 修改
      else {
        if (props.onUpdate) {
          console.log("update");
          props.onUpdate(state.dataForm);
        }
      }
      })
    };
    //获取子组件中的fileurl
    const onUploadResourceSuccess = (objUpdate) => {
      console.log(objUpdate.name);
      state.dataForm.url = objUpdate.name;
    };

    return {
      ...toRefs(state),
      open,
      close,
      resourceForm,
      createOrUpdateMate,
      onUploadResourceSuccess,
    };
  },
};
</script>





