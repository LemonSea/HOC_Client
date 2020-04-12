// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosAuthInstance } from "../../api/config";

// 修改个人信息
export const reqUpdateUserAccount = (_id, data) => {
    try {
        return axiosAuthInstance({
            method: "PUT",
            headers: { 'Content-type': 'application/json', },
            url: 'users/account',
            data: {
                _id: _id,
                data
            },
        })
    } catch (error) {
        console.log('请求出错！', error)
    }
}