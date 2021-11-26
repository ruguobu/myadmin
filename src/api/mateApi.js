import { ElSteps } from "element-plus";
import axios from "../utils/axios";


//分页加载标签？要么直接获取，要么模糊查询
export function loadMates(page, pageSize,queryKey) {
    // 如果有querykey 那我就模糊搜索
    if(queryKey && queryKey.length > 0){
        return axios.get('MateResources/queryByName', 
            {
                params:{
                    page : page,
                    pageSize: pageSize,
                    queryKey : queryKey,
                }
            }
        )
    }else{//否则就分页查询
        return axios.get("MateResources/pageQuery", {
            params:{
                page : page,
                pageSize: pageSize,
            }
        });
    }
}

//新建标签名
export function createMate(mate){
    // 如果有mate，则是新建标签名
    return axios.post('MateResources/add',mate)
}

// 修改标签名
export function updateMate(mate){
    return axios.put('MateResources/update',mate)
}


//单个删除
export function deleteOneMateById(id){
    return axios.delete(`MateResources/delete/${id}`)
}

//多个删除
export function deleteManyMatesByIds(ids){
    return axios.delete('MateResources/delete/many',{data:ids})
}
//获取所有标签 api/MateResources/queryAll
export function getAllMate(){
    return axios.get('MateResources/queryAll')
}



