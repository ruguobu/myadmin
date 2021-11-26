import { ElSteps } from "element-plus";
import axios from "../utils/axios";


//分页加载标签？要么直接获取，要么模糊查询
export function loadCategories(page, pageSize,queryKey) {
    // 如果有querykey 那我就模糊搜索
    if(queryKey && queryKey.length > 0){
        return axios.get(`CourseGategoryResource/queryByNameLike/${queryKey}`, 
            {
                params:{
                    page : page,
                    pageSize: pageSize,
                }
            }
        )
    }else{//否则就分页查询 /api/CourseGategoryResource/pageQuery
        return axios.get("CourseGategoryResource/pageQuery", {
            params:{
                page : page,
                pageSize: pageSize,
            }
        });
    }
}

//新建分类名/api/CourseGategoryResource/add 
export function createMate(gategory){
    // 如果有mate，则是新建标签名
    return axios.post('CourseGategoryResource/add',gategory)
}

// 修改分类/api/CourseGategoryResource/update
export function updateMate(gategory){
    return axios.put('CourseGategoryResource/update',gategory)
}


//单个删除/api/CourseGategoryResource/delete/{gategoryId}
export function deleteOneMateById(id){
    return axios.delete(`CourseGategoryResource/delete/${id}`)
}

//多个删除/api/CourseGategoryResource/deleteMany/{gategoryIds}
export function deleteManyMatesByIds(ids){
    return axios.delete('CourseGategoryResource/delete/many',{data:ids})
}

//获取所有分类 api/CourseGategoryResource/queryAll
export function getAllMate(){
    return axios.get('CourseGategoryResource/queryAll')
}



