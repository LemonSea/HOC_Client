// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqStaffType } from '../api';

const redStaffType = (data) => ({
  type: actionTypes.GET_STAFFTYPE,
  data: fromJS(data)
});

// 获取list数据
export const getStaffType = () => {
  return async (dispatch) => {
    const result = await reqStaffType()
    if (result.status === 0) {  
      console.log(result)    
      dispatch(redStaffType(result.data))
    } else {
      console.error(result);      
    }
  }
}