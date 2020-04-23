// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";

// 获取公司详情
export const reqCompanyDetail = (_id) => {
    try {
        const Result = axiosAuthInstance({
            method: "GET",
            headers: { 'Content-type': 'application/json', },
            url: 'company/client',
            params: {
                _id
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 收藏公司
export const reqAddCompanyFavorites = (data) => {
    try {
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'companyFavorites',
            data: {
                data
            },
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 获得公司收藏列表（ALL)
export const reqAllCompanyFavoritesList = (user) => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            url: 'companyFavorites/allList',
            params: {
                user
            }
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
