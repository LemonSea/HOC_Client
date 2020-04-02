// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    officer:{},
    firm:{},
    account:{}
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.RED_OFFICER:
            return state.set('officer', action.data);
        case actionTypes.RED_FIRM:
            return state.set('firm', action.data);
        case actionTypes.RED_ACCOUNT:
            return state.set('account', action.data);
        default:
            return state;
    }
}