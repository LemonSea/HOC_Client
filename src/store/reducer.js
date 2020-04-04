// 合并 reducer 函数
import { combineReducers } from 'redux-immutable';
// import { combineReducers } from 'redux';
// 导入分仓库的 reducer
import { reducer as headerReducer}  from '../common/header/store';
import { reducer as loginReducer}  from '../pages/login/store';
import { reducer as mainReducer}  from '../pages/main/store';
import { reducer as regFirmReducer}  from '../pages/regFirm/store';

// 合并 reducer 函数为一个 obj
const reducer = combineReducers({
    header: headerReducer,
    loginReducer,
    mainReducer,
    regFirmReducer
})

export default reducer
