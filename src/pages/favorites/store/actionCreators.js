// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqStaffFavoritesList, reqBrandFavoritesList } from '../api';

const getStaffList = (data, total, pageNum) => ({
    type: actionTypes.GET_LIST,
    list: fromJS(data),
    total: fromJS(total),
    pageNum: fromJS(pageNum)
});

const getBrandList = (data, total, pageNum) => ({
    type: actionTypes.GET_BRAND_LIST,
    list: fromJS(data),
    total: fromJS(total),
    pageNum: fromJS(pageNum)
});

// 获取员工收藏list数据，一般分页
export const getStaffFavoritesList = (user, pageNum, pageSize) => {
    return async (dispatch) => {
        try {
            const result = await reqStaffFavoritesList(user, pageNum, pageSize)
            if (result.status === 0) {
                dispatch(getStaffList(result.data.list, result.data.num, result.data.pageNum))
            } else {
                dispatch(getStaffList(result.data.list, result.data.num, result.data.pageNum))
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}

// 获取公司收藏list数据，一般分页
export const getBrandFavoritesList = (user, pageNum, pageSize) => {
    return async (dispatch) => {
        try {
            const result = await reqBrandFavoritesList(user, pageNum, pageSize)
            if (result.status === 0) {
                dispatch(getBrandList(result.data.list, result.data.num, result.data.pageNum))
            } else {
                dispatch(getBrandList(result.data.list, result.data.num, result.data.pageNum))
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}
