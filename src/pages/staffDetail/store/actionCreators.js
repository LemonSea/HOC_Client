// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqStaffDetail, reqOrderDetail, reqStaffOrder } from '../api';

const redStaffDetail = (data) => ({
  type: actionTypes.GET_DETAIL,
  data: fromJS(data)
});

const redOrderDetail = (data) => ({
  type: actionTypes.GET_ORDER_DETAIL,
  data: fromJS(data)
});

const redStaffOrder = (data) => ({
  type: actionTypes.STAFF_ORDER,
  data: fromJS(data)
});

// 获取员工你详情
export const getStaffDetail = (_id) => {
  return async (dispatch) => {
    const result = await reqStaffDetail(_id)
    if (result.status === 0) {  
      // console.log(result)    
      dispatch(redStaffDetail(result.data[0]))
    } else {
      console.error(result);      
    }
  }
}

// 获取员工你详情
export const getOrderDetail = (_id) => {
  return async (dispatch) => {
    const result = await reqOrderDetail(_id)
    if (result.status === 0) {  
      // console.log(result)    
      dispatch(redOrderDetail(result.data[0]))
    } else {
      console.error(result);      
    }
  }
}
// 获取对应员工当天的订单
export const getStaffOrder = (employee, selectDay) => {
  return async (dispatch) => {
    const result = await reqStaffOrder(employee, selectDay)
    if (result.status === 0) {  
      console.log(result)    
      dispatch(redStaffOrder(result.data))
    } else {
      console.error(result);      
    }
  }
}