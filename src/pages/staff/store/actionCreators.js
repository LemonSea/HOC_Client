// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqFirmRecommend, reqStaffRecommend } from '../api';

const getList = (data, total, pageNum) => ({
    type: actionTypes.GET_LIST,
    list: fromJS(data),
    total: fromJS(total),
    pageNum: fromJS(pageNum)
});

const changeType = (data) => ({
    type: actionTypes.CHANGE_TYPE,
    staffType: fromJS(data)
})

// 获取list数据，一般分页
export const reqList = (pageNum, pageSize) => {
    return async (dispatch) => {
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staff/client/list',
                params: {
                    pageNum: pageNum,
                    pageSize: pageSize
                }
            })
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

// 获取 list，条件分页
export const searchList = (pageNum, pageSize, typeItem) => {
    return async (dispatch) => {
        console.log('searchList', pageNum, pageSize, typeItem)
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staff/client/searchList',
                params: {
                    pageNum,
                    pageSize,
                    typeItem,
                }
            })
            if (result.status === 0) {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
                console.log(result)
            } else {
                dispatch(getList(result.data.list, result.data.num, result.data.pageNum))
            }
        } catch (error) {
            console.log('请求出错！', error)
        }
    }
}

export const changeStaffType =  (pageNum, pageSize, typeItem) => {
    return async (dispatch) => {
        // console.log('typeItem',typeItem)
        dispatch(changeType(typeItem))
        console.log(pageNum, pageSize, typeItem)
        try {
            const result = await axiosAuthInstance({
                method: "GET",
                url: 'staff/client/searchList',
                params: {
                    pageNum,
                    pageSize,
                    typeItem,
                }
            })
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