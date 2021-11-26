<template>
    <el-input
        v-model="queryKey"
        placeholder="请输入要搜索的内容"
        class="input-with-select"
    >
        <!-- <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 110px">
            <el-option label="标签名称" value="name"></el-option>
        </el-select>
        </template> -->
        <template #append>
        <el-button @click="handleSearch" icon="el-icon-search"></el-button>
        </template>
    </el-input>
</template>

<script>
import { reactive ,toRefs } from "vue";

export default {
    name: "ZhztTextSearch",
    props: {
        mycccc : String,
        search : Function,
    },
    setup (props) {
        console.log('----setup----',props)
        const state = reactive({
            queryKey : ""
        })
    
        const handleSearch  = ()=>{
            if(props.search){
                props.search(state.queryKey)
            }
        }      

        return {
            handleSearch,
            ...toRefs(state)
        }
    }
}
</script>