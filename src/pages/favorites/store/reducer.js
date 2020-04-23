// 获取常量
import * as actionTypes from './constants';
// 导入 immutable 的 frmoJS 方法
import { fromJS } from 'immutable';

// 这里用到fromJS把JS数据结构转化成immutable数据结构
const defaultState = fromJS({
    staffList: [],  // 员工列表
    staffTotal: 0, // 员工分页总数量
    staffPageNum: 1,
    staffLoading: true
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST:
            return state.merge({
                staffList: action.list,
                staffTotal: action.total,
                staffPageNum: action.pageNum,
                staffLoading: false
            });
        default:
            return state;
    }
}