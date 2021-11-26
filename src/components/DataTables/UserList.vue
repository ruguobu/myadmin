<!--
created: 2021-10-26
Author: 张兴顺
Desc：本组件用于展示用户信息列表，支持用户的增加、删除、修改等管理功能
Input: 无输入
API： 用户信息API 获取用户，增加，删除和修改用户的API
-->

<template>
  <el-table :data="users" stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="department" label="单位" width="180" />
    <el-table-column prop="userType" label="用户类型" />
  </el-table>
</template>

<script>

import {LoadUsers} from '../api'
import {onMounted, reactive, toRefs} from 'vue'

export default {
    name: 'UserList',

    setup(){
    
        const state = reactive({
            users : null,
        })

        onMounted(()=>{
            state.users = loadUsers();
        })

        return({
            ...toRefs(state)
        })
    
    }
}

</script>

<style lang="scss" scoped>

</style>