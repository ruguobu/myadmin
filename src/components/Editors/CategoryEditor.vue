<template>
  <!-- 修改标签dialog -->
  <el-dialog v-model="visible" :title="editType==1?'新增分类':'修改分类'" width="30%" center>
    <el-form ref="gategoryForm" :rules="rules" :model="dataForm">
      <el-form-item prop="name">
        <el-input
          v-model.trim="dataForm.name"
          placeholder="请输入类名"
          clearable
        />
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
        <el-button type="primary" @click="createOrUpdateGategory"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 修改标签dialog结束 -->
</template> 

<script>
import { toRefs, reactive, ref, watch } from "vue";

export default {
  name: "MateEditor",
  props: {
    onCreate: Function,
    onUpdate: Function,
    mates: Array,
  },
  setup(props) {
    const gategoryForm = ref(null);
    const state = reactive({
      dataForm: {
        id: 0,
        completerate: 0,
        fullname: "",
        fullpath: "",
        name: "",
        parentrId: 0,
        parentrName: "",
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
    const createOrUpdateGategory = () => {
     
      gategoryForm.value.validate((valid) => {
         
        if (valid) {
          // 创建
          if (state.editType == 1) {
              props.onCreate(state.dataForm);
          }
          // 修改
          else {
              props.onUpdate(state.dataForm);
          }
        }
      });
    };

    return {
      ...toRefs(state),
      open,
      close,
      gategoryForm,
      createOrUpdateGategory,
    };
  },
};
</script>
