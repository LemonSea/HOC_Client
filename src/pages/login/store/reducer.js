// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';
import * as storageUser from '../../../utils/storageUser';

let user = storageUser.getUser(), status = false;
var arr = Object.keys(user);
if (arr.length !== 0) {
    storageUser.getUser()
    status = true;
}

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    currentUser: user,
    loginStatus: status
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return state.merge({
                currentUser: action.data,
                loginStatus: true
            });
        case actionTypes.CHANGE_LOGINSTATUS:
            return state.set('loginStatus', true);
        case actionTypes.USER_LAYOUT:
            return state.merge({
                currentUser: {},
                loginStatus: false
            });
            // return state.set('loginStatus', false);
        default:
            return state;
    }
}