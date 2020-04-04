// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
// import { reqStaffType } from '../api';

const redOfficer = (data) => ({
  type: actionTypes.RED_OFFICER,
  data: fromJS(data)
});

const redFirm = (data) => ({
  type: actionTypes.RED_FIRM,
  data: fromJS(data)
});

const redAccount = (data) => ({
  type: actionTypes.RED_ACCOUNT,
  data: fromJS(data)
});


export const getOfficer = (data) => {
  return (dispatch) => {
      dispatch(redOfficer(data))
  }
}
export const getFirm = (data) => {
  return (dispatch) => {
      dispatch(redFirm(data))
  }
}
export const getAccount = (data) => {
  return (dispatch) => {
      dispatch(redAccount(data))
  }
}

