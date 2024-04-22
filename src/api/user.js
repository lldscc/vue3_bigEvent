import request from "@/utils/request.js";

/**
 * 1.注册接口
 */
export const registerService = (registerData) => {
    var params = new URLSearchParams();
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post('/user/register', params)
}
/**
 * 2.登录接口
 */
export const loginService = (loginData) => {
    var params = new URLSearchParams();
    for(let key in loginData){
        params.append(key, loginData[key]);
    }
    return request.post('/user/login', params)
}
/**
 * 3.个人信息
 */
export const userInfoGetService = ()=>{
    return request.get('/user/userInfo');
}
/**
 * 4.修改个人信息
 */
export const userInfoUpdateService = (userInfo)=>{
    return request.put('/user/update',userInfo)
}










