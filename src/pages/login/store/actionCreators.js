// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqLogin, reqRegister } from '../api';
import * as storageUser from '../../../utils/storageUser';
import * as storageToken from '../../../utils/storageToken';

export const userLogin = (data) => ({
  type: actionTypes.USER_LOGIN,
  data: fromJS(data)
});

const changeLoginState = () => ({
  type: actionTypes.CHANGE_LOGINSTATUS
});

const changeLayoutState = () => ({
  type: actionTypes.USER_LAYOUT,
});

// 登录
export const postLoginRequest = (FormData) => {
  return async (dispatch) => {
    const result = await reqLogin(FormData)
    if (result.status === 0) {
      console.log(result.data)
      // 登录成功 
      storageUser.removeUser()
      storageToken.removeToken()
      storageUser.setUser(result.data)
      storageToken.setToken(result.token)
      dispatch(userLogin(result.data))
    } else {
      // 登录失败
      dispatch(changeLoginState())
    }
  }
}

// 注册
export const postRegisterDispatch = (FormData) => {
  return async (dispatch) => {
    console.log('FormData', FormData)
    const result = await reqRegister(FormData)
    if (result.status === 0) {
      console.log(result.data)
      // 注册成功
      storageUser.removeUser()
      storageToken.removeToken()
      storageUser.setUser(result.data)
      storageToken.setToken(result.token)
      dispatch(userLogin(result.data))
    } else {
      // 登录失败
      dispatch(changeLoginState())
    }
  }
}

// 登出
export const postLayoutRequest = () => {
  return (dispatch) => {
      storageUser.removeUser()
      storageToken.removeToken()
      dispatch(changeLayoutState())
  }
}