<template>
<el-table :data="data">
    <el-table-column prop="id" label="id"  />
    <el-table-column prop="name" label="Name"  />
</el-table>
<MateEditor ref="hlRef"/>
</template>


<script>
import {ref, reactive, toRefs} from 'vue' 
import MateEditor from '@/components/Editors/MateEditor.vue'


export default{
	name:"CourseManagement",
	conponents:{MateEditor,},
	setup(){
		
		const hlRef = ref(null)
		
		const state = reactive({
			data: [{id:1, name:'zhangxingshun'},{id:2, name:'anmingzhe'}]
		})
		
		return{
			...toRefs(state),
			hlRef,
		}
		
	}
}
</script>