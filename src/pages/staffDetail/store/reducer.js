// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    staffDetail: {},
    orderDetail: {},
    staffOrder: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAIL:
            return state.set('staffDetail', action.data);
        case actionTypes.GET_ORDER_DETAIL:
            return state.set('orderDetail', action.data);
            case actionTypes.STAFF_ORDER:
                return state.set('staffOrder', action.data);
        default:
            return state;
    }
}