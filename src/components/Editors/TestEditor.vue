<template>
  <!-- 修改标签dialog -->
  <el-dialog v-model="visible" :title="editType==1?'新增试题':'修改试题'" width="30%" center>
    <el-form ref="mateForm" :rules="rules" :model="dataForm">
      <el-form-item prop="name">
        <el-input
          v-model.trim="dataForm.name"
          placeholder="请输入标签名"
          clearable
        />
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
import { toRefs, reactive, ref } from "vue";

export default {
  name: "TestEditor",
  props: {
    onCreate: Function,
    onUpdate: Function,
  },
  setup(props) {
    const mateForm = ref(null);
    const addflag = ref(1);
    const state = reactive({
      dataForm: {
        name: "",
        id: null,
        createTime: new Date(),
        clickRate: 0,
        delete: false,
      },
      rules: {
        name: [
          { required: "true", message: "标签名不能为空", trigger: "blur" },
        ],
      },
      visible: false,
      editType: 1, //1为新增 2为修改
    });

    // 打开弹出框【用于编辑标签资源】
    const open = (testObj) => {
      console.log("这是啥",testObj)
      if (!testObj) {
        console.log("这是新增")
        state.editType = 1;
        state.dataForm.name = "";
      } else {
        console.log("这是修改",testObj)
        state.editType = 2;
        state.dataForm = { ...testObj };
      }
      state.visible = true;
    };

    // 关闭弹出框
    const close = () => {
      state.dataForm.name = "";
      state.visible = false;
    };

    // 增加或修改数据
    const createOrUpdateMate = () => {
      mateForm.value.validate((valid) => {
        if (valid) {
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
        }
      });
    };

    return {
      ...toRefs(state),
      addflag,
      open,
      close,
      mateForm,
      createOrUpdateMate,
    };
  },
};
</script>
