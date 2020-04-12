// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";

// 登录
export const reqLogin = (data) => {
    try {
        const result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'users/login',
            data: data,
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 注册
export const reqRegister = (data) => {
    try {
        const result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'users/register',
            data: data,
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 修改个人信息
export const reqUpdateUserInfo = (_id, data) => {
    try {
        return axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'users/info',
            data: {
                _id: _id,
                data
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}