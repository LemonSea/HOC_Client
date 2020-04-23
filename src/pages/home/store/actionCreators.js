// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import {  reqFirmRecommend, reqStaffRecommend } from '../api';

const redFirmRecommend = (data) => ({
  type: actionTypes.FIRM_RECOMMEND,
  data: fromJS(data)
});
const redStaffRecommend = (data) => ({
  type: actionTypes.STAFF_RECOMMEND,
  data: fromJS(data)
});

// 获取推荐公司
export const getFirmRecommend = () => {
  return async (dispatch) => {
    const result = await reqFirmRecommend()
    if (result.status === 0) {  
      // console.log(result)    
      dispatch(redFirmRecommend(result.data))
    } else {
      console.error(result);      
    }
  }
}

// 获取推荐员工
export const getStaffRecommend = () => {
  return async (dispatch) => {
    const result = await reqStaffRecommend()
    if (result.status === 0) {  
      // console.log(result)    
      dispatch(redStaffRecommend(result.data))
    } else {
      console.error(result);      
    }
  }
}

