import axios from "../utils/axios";


//登录密码
export function loginPassWord(params) {
    return axios.post("/auth/pwd/login", params);
}
