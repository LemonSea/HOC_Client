// 导入常量
import * as actionTypes from './constants';
// 将JS对象转换成immutable对象
import { fromJS } from 'immutable';
// 导入网络请求
// import { postLoginRequest } from '../../../api/request';
import { axiosInstance, axiosAuthInstance } from "../../../api/config";
import { reqUserAddressList } from '../api';

const setList = (data, total, pageNum) => ({
  type: actionTypes.GET_LIST,
  data: fromJS(data)
});

// 获取地址列表
export const getList = (user) => {
  return async (dispatch) => {
    try {
      const result = await reqUserAddressList(user)
      if (result.status === 0) {
        console.log(result.data)
        dispatch(setList(result.data))
      } else {
        dispatch(setList())
      }
    } catch (error) {
      console.log('请求出错！', error)
    }
  }
}
