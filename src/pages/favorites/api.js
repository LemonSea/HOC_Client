// 导入网络请求
import { axiosAuthInstance } from "../../api/config";

// 获得员工收藏列表
export const reqStaffFavoritesList = (user, pageNum, pageSize) => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            url: 'staffFavorites',
            params: {
                user,
                pageNum,
                pageSize
            }
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

export const reqDeleteStaffFavorites = (data) => {
    try {
        const Result = axiosAuthInstance({
            method: "DELETE",
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