<template>
  <div class="header">
    <div class="left">
      <span style="fonsize: 20px;">{{ name }}</span>
    </div>
    <div class="right">
      <el-popover 
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box">
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{ userInfo && userInfo.nickName || '' }}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ userInfo && userInfo.loginUserName || '' }}</p>
          <p>昵称：{{ userInfo && userInfo.nickName || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {pathMap, localRemove} from '../utils'
//import axios from '../utils/axios'


export default {
  name : 'Header',
  setup(){
    // 获取路由实例
    const router = useRouter()
    const state = reactive({
      name: '首页',
      userInfo: null,
    })
    // 初始化执行方法
    onMounted(()=>{
      const pathName = window.location.hash.split('/')[1] || ''
      if(!['login'].includes(pathName)){
        getUserInfo()
      }
    })
    // 获取用户信息
    const getUserInfo = async()=>{
      //let info = await axios.get('/api/user/query') || null
      const info = {loginUserName : 'zwzo', nickName:'张兴顺'}
      state.userInfo = info
    }
    // 退出登录
    const logout = ()=>{
      localRemove('token')
      router.push('/login')
    }


    router.afterEach((to)=>{
      // console.log('to', to)
      state.name = pathMap[to.name]
    })
    return {
      ...toRefs(state),
      logout
    }
  }
}
</script>

<style scoped>
  .header{
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 20px;
  }
  .right > div > .icon{
    font-size: 18px;
    margin-right: 6px;
  }
  .author {
    margin-left: 10px;
    cursor: pointer;
  }
</style>

<style>
  .popper-user-box {
    /* background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat!important; */
    /* background-size: cover!important; */
    border-radius: 0!important;
    /* background-color:plum; */
  }
  .popper-user-box .nickname {
    position: relative;
    color: #ffffff;
    background-color:plum;
  }
  .popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>
