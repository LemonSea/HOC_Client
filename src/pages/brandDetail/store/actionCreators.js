// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqCompanyDetail } from '../api';

const redCompanyDetail = (data) => ({
  type: actionTypes.GET_DETAIL,
  data: fromJS(data)
});

// 获取员工你详情
export const getCompanyDetail = (_id) => {
  return async (dispatch) => {
    const result = await reqCompanyDetail(_id)
    if (result.status === 0) {  
      // console.log(result)    
      dispatch(redCompanyDetail(result.data[0]))
    } else {
      console.error(result);      
    }
  }
}