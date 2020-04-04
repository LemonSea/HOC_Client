// 导入网络请求
import { axiosAuthInstance } from "../../api/config";

// 获取员工类型
export const reqStaffType = () => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            headers: { 'Content-type': 'application/json', },
            url: 'staffStatus/type',
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}

// 获取对应角色
export const reqRole = () => {
    try {
        const result = axiosAuthInstance({
            method: "GET",
            url: 'role/list',
        })
        return result;
    } catch (error) {
        console.log('请求出错！', error)
    }
}
