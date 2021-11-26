<template>
<el-form>
    <header>{{ editType == 1 ? "编辑" : "新建" }}用户</header>
    <!-- <el-input type="text" placeholder="请输入姓名" :enabled="{editType == 1 ? "编辑"}"/> -->
    
</el-form>
</template>

<script>
import Header from '../Header.vue'

export default {
  name:'UserEditor',
  components: { Header },
    setup () {
        
        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>