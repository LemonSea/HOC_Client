// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqStaffType, reqRole } from '../api';

const redStaffType = (data) => ({
  type: actionTypes.GET_STAFFTYPE,
  data: fromJS(data)
});
const redRole = (data) => ({
  type: actionTypes.GET_ROLE,
  data: fromJS(data)
});

// 获取员工类型数据
export const getStaffType = () => {
  return async (dispatch) => {
    const result = await reqStaffType()
    // console.log(result)
    if (result.status === 0) {  
      // console.log(result)    
      dispatch(redStaffType(result.data))
    } else {
      console.error(result);      
    }
  }
}

// 获取角色数据
export const getRole = () => {
  return async (dispatch) => {
    const result = await reqRole()
    if (result.status === 0) {  
      // console.log(result)    
      dispatch(redRole(result.data))
    } else {
      console.error(result);      
    }
  }
}

