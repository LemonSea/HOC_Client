// 导入网络请求
import { axiosAuthInstance } from "../../api/config";

export const addUserHead = (data) => {
    try {
        // console.log('addUserHead', data)
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'users/head',
            data: {
                data
            }
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
export const addCompany = (data) => {
    try {
        console.log('addCompany', data)
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'company',
            data: {
                data
            }
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

export const addCompanyAuditRecord = (data) => {
    try {
        console.log('addCompanyAuditRecord', data)
        const Result = axiosAuthInstance({
            method: "POST",
            headers: { 'Content-type': 'application/json', },
            url: 'companyAuditRecord',
            data: {
                data
            }
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}