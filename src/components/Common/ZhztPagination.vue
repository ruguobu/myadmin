<template>
    <!--分页组件-->
    <el-pagination background 
        layout="prev, pager, next" 
        :total="totalDataCount"
        :page-size="pageSize"
        :current-page="currentPage"
        @prev-click="handlePrevPageClick"
        @next-click="handleNextPageClick"
        @current-change="handleCurrentPageChange">
    </el-pagination>
    <!--分页组件结束-->
</template>

<script>
import {reactive, toRefs, watch} from 'vue'
import paginationSettings from '@/config/settings'
export default {
    name: "ZhztPagination",
    props:{
        updateData: Function,
        totalCount: Number,
        pageSize: Number,
        currentPage: Number,
    },
    setup (props) {
         // 【定义state对数据、分页等组件进行管理】
        const state = reactive({
            currentPage: paginationSettings.page,
            pageSize: paginationSettings.pageSize,
            totalDataCount: 1,
        })

        // 监听页数变化 更新分页总数
        watch(props,(oldData,newData)=>{
            state.totalDataCount = newData.totalCount
            state.pageSize = newData.pageSize
            state.currentPage = newData.currentPage
        })

         // 分页 下一页
        const handleNextPageClick = ()=>{
            state.currentPage <= state.totalDataCount / state.pageSize ? state.currentPage+1 : ElMessage.info("没有更多内容了!");
            if(props.updateData){props.updateData(state.currentPage, state.pageSize)}
        }

        // 分页 上一页
        const handlePrevPageClick = ()=>{
            state.currentPage  == 1 ?  ElMessage.info("已经在第一页了!") : state.currentPage-1;
            if(props.updateData){props.updateData(state.currentPage, state.pageSize)}
        }

        // 分页 跳转到指定页
        const handleCurrentPageChange = (selectedPage)=>{
            state.currentPage  = selectedPage
            if(props.updateData){props.updateData(state.currentPage, state.pageSize)}
        }

        return {
            ...toRefs(state),
            handleCurrentPageChange,
            handleNextPageClick,
            handlePrevPageClick,
        }
    }
}
</script>