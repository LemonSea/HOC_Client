// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";

export const reqUserAddressList = (user) => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            url: 'userAddress',
            params: {
                user
            }
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

export const reqAddUserAddress = (data) => {
    try {
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'userAddress',
            data: {
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

export const reqEditUserAddress = (_id, data) => {
    try {
        const Result = axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'userAddress',
            data: {
                _id,
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
export const reqDeleteUserAddress = (_id) => {
    try {
        const Result = axiosAuthInstance({
            method: "DELETE",
            headers: { 'Content-type': 'application/json', },
            url: 'userAddress',
            data: {
                _id
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

export const reqSetDefault = (oldId, newId) => {
    try {
        const Result = axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'userAddress/setDefault',
            data: {
                oldId,
                newId
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
