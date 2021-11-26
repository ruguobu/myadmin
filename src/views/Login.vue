<template>
  <div class="login-body">
    <!--登录框div-->
    <div class="login-container">
      <!--登录框头部logo部分-->
      <div class="head">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" />
        <div class="name">
          <div class="title">虚拟演练与评估平台</div>
          <div class="tips">V1.0版本 管理人员控制台</div>
        </div>
      </div>

      <!--loginForm是从setup内返回得到的-->
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { loginPassWord } from "@/api/index.js";
import {ref, reactive, toRefs} from 'vue'
import axios from '../utils/axios'
import {localSet} from '../utils'
import { ElMessage } from "element-plus";
export default({
  name: 'Login',
  setup(){
    // el-form 接受一个ref属性， Vue3需要这样声明
    const loginForm = ref(null)
    // 状态数据
    const state = reactive({
      ruleForm : {
        username : '',
        password : ''
      },
      checked : true,
      // 表单验证
      rules : {
        username : [
          {required : true, message:'账户不能为空', trigger:'blur'}
        ],
        password : [
          {required : true, message:'密码不能为空', trigger:'blur'}
        ]
      }
    })
    // 表单提交方法
    const submitForm = async ()=>{
      loginForm.value.validate((valid) =>{
        if(valid){
          axios.post('/api/accredit',{
            username : state.ruleForm.username,
            password : state.ruleForm.password
          }).then(res=>{
            localSet("token", res)
            window.location.href = '/'
          })
        }else{
          // 临时添加 进行单机测试
          localSet("token", '1123131312')
          window.location.href = '/'
          // 临时添加结束
          console.log('error submit')
          return false
        }
      })
    }
    // 重置表单方法
    const restForm = ()=>{
      loginForm.value.resetFields()
    }
    //密码登录
    const loginPassWordFn = async () => {
      if (!loginForm.password) return;
      let params = Object.assign({}, loginForm);
      let res = await loginPassWord(params);
      console.log("res: ", res);
      if (res) {
        if (res.errCode == 0) {
          setUserInfo(res.data);
          router.push("/home");
          ElMessage.success(res.errMsg);
        } else {
          ElMessage.info(res.errMsg);
        }
      }
    };
    return{
      ...toRefs(state),
      loginForm,
      submitForm,
      restForm,
      loginPassWordFn
    }
  }
})
</script>

<style lang='scss' scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
  .login-form >>> .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form >>> .el-form-item {
    margin-bottom: 0;
  }
</style>
