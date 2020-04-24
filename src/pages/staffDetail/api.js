// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";

// 增加订单
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

// 获取订单详情
export const reqOrderDetail = (_id) => {
    try {
        const Result = axiosAuthInstance({
            method: "GET",
            headers: { 'Content-type': 'application/json', },
            url: 'order/client',
            params: {
                _id
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 改变订单状态
export const reqChangeOrder = (_id, status) => {
    try {
        console.log('reqFinishOrder-status', status)
        return axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'order/client/orderStatus',
            data: {
                _id,
                status
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}


// 订单打分/评论
export const reqAddOrderComments = (data) => {
    try {
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'orderComments',
            data: {
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
