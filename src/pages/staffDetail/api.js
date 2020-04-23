// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";


export const reqAddOrder = (data) => {
    try {
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'order/add',
            data: {
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 获取员工详情
export const reqStaffDetail = (_id) => {
    try {
        const Result = axiosAuthInstance({
            method: "GET",
            headers: { 'Content-type': 'application/json', },
            url: 'staff/client',
            params: {
                _id
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 收藏员工
export const reqAddStaffFavorites = (data) => {
    try {
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'staffFavorites',
            data: {
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 获得员工收藏列表（ALL)
export const reqAllStaffFavoritesList = (user) => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            url: 'staffFavorites/allList',
            params: {
                user
            }
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}