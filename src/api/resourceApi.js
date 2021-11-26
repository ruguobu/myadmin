import { ElSteps } from "element-plus";
import axios from "../utils/axios";


//分页加载资源？要么直接获取，要么模糊查询
///api/CourseraResource/PageQueryByNameOrMate
export function loadResources(page, pageSize,queryKey) {
    // 如果有querykey 那我就模糊搜索
    if(queryKey && queryKey.length > 0){
        return axios.get('CourseraResource/PageQueryByNameOrMate', 
            {
                params:{
                    page : page,
                    pageSize: pageSize,
                    nameOrMate:queryKey 
                }
            }
        )
    }else{//否则就分页查询
        return axios.get("CourseraResource/pageQuery", {
            params:{
                page : page,
                pageSize: pageSize,
            }
        });
    }
}

//新建资源 /api/CourseraResource/add
export function createResource(res){
    return axios.post('CourseraResource/add',res)
}

// 修改资源 /api/CourseraResource/update
export function updateResource(res){
    return axios.put('CourseraResource/update',res)
}


// 单个删除 /api/CourseraResource/delete/{resourceId}
export function deleteOneResourceById(id){
    console.log(`CourseraResource/delete/${id}`)
    return axios.delete(`CourseraResource/delete/${id}`)
}


//多个删除 /api/CourseraResource/delete/many
export function deleteManyResourceByIds(ids){
    return axios.delete('CourseraResource/delete/many',{data:ids})
}


//按照Mate标签查询
//api/CourseraResource/queryByMate/{mate}


//按照资源类型查询MP3/video 
//api/CourseraResource/queryByResourceType/{resourceType}