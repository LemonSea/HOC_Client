// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqStaffFavoritesList } from '../api';

const getList = (data, total, pageNum) => ({
    type: actionTypes.GET_LIST,
    list: fromJS(data),
    total: fromJS(total),
    pageNum: fromJS(pageNum)
});

// 获取list数据，一般分页
export const getStaffFavoritesList = (user, pageNum, pageSize) => {
    return async (dispatch) => {
        try {
            const result = await reqStaffFavoritesList(user, pageNum, pageSize)
            if (result.status === 0) {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
            } else {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
