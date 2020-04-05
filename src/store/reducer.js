// 合并 reducer 函数
import { combineReducers } from 'redux-immutable';
// import { combineReducers } from 'redux';
// 导入分仓库的 reducer
import { reducer as headerReducer}  from '../common/header/store';
import { reducer as loginReducer}  from '../pages/login/store';
import { reducer as mainReducer}  from '../pages/main/store';
import { reducer as regFirmReducer}  from '../pages/regFirm/store';
import { reducer as homeReducer}  from '../pages/home/store';
import { reducer as staffReducer}  from '../pages/staff/store';
import { reducer as brandReducer}  from '../pages/brand/store';
import { reducer as orderReducer}  from '../pages/order/store';

// 合并 reducer 函数为一个 obj
const reducer = combineReducers({
    header: headerReducer,
    loginReducer,
    mainReducer,
    regFirmReducer,
    homeReducer,
    staffReducer,
    brandReducer,
    orderReducer
})

export default reducer
