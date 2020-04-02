// 导入网络请求
import { axiosAuthInstance } from "../../api/config";

export const reqStaffType = () => {
    try {
        const Result = axiosAuthInstance({
            method: "GET",
            headers: { 'Content-type': 'application/json', },
            url: 'staffStatus/type',
        })
        return Result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
