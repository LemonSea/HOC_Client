// 导入网络请求
import { axiosAuthInstance } from "../../api/config";

// 获取推荐公司
export const reqFirmRecommend = () => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            url: 'company/recommend',
            params: {
                limit: 8
            }
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
// 获取推荐员工
export const reqStaffRecommend = () => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            url: 'staff/recommend',
            params: {
                limit: 8
            }
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}