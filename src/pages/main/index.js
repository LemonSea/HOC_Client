import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

import {
  BackTop,
  Affix,
  Layout
} from 'antd';

import Header from '../../common/header';

import NotFound from '../not-found/not-found';

/*
路由组件
*/
// 首页信息
import Home from '../home/index';
// 公司信息
import Brand from '../brand/index';
// 职员信息
import Staff from '../staff/index';
// 详情页
import BrandDetail from '../brandDetail/index';
import StaffDetail from '../staffDetail/index';
// 预约
import AppointmentSure from '../staffDetail/appointment-sure';
import AppointmentPay from '../staffDetail/appointment-pay';
import AppointmentDone from '../staffDetail/appointment-done';
import AppointmentFinish from '../staffDetail/appointment-finish';
// 地址簿
import AddressBook from '../address/index';
// 收藏夹
import Favorites from '../favorites/index';
// 订单
import OrderList from '../order/order-list';
// 个人信息
import Personal from '../personal/index';
// 修改密码
import accountValidate from '../account/account-validate';

const { Footer, Sider, Content } = Layout;
class Main extends Component {

  state = {
    top: 0,
    bottom: 10,
  };

  componentWillMount() {
    this.props.getStaffType(this.props.staffType)
    this.props.getRole(this.props.role)
  }

  render() {
    // dispatch to props
    const { } = this.props;
    // state to props
    const { } = this.props;
    // console.log('currentUserJS', currentUserJS)

    return (
      <div>
        <Affix offsetTop={this.state.top}>
          <Header />
        </Affix>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path='/home' component={Home}></Route>

          <Route path='/brand' component={Brand}></Route>
          <Route path='/staff' component={Staff}></Route>

          <Route path='/brandDetail' component={BrandDetail}></Route>
          <Route path='/staffDetail' component={StaffDetail}></Route>
          <Route path='/appointment-sure' component={AppointmentSure}></Route>
          <Route path='/appointment-pay' component={AppointmentPay}></Route>
          <Route path='/appointment-done' component={AppointmentDone}></Route>
          <Route path='/appointment-finish' component={AppointmentFinish}></Route>

          <Route path='/order-list' component={OrderList}></Route>
          
          <Route path='/address-book' component={AddressBook}></Route>
          <Route path='/favorites' component={Favorites}></Route>

          <Route path='/personal' component={Personal}></Route>
          <Route path='/account-validate' component={accountValidate}></Route>

          <Route component={NotFound} />
        </Switch>
        <BackTop />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  staffType: state.getIn(['mainReducer', 'staffType']),
  role: state.getIn(['mainReducer', 'role']),
})

const mapDispatchToProps = (dispatch) => ({
  getStaffType(staffType) {
    if(staffType.toJS().length === 0) {
      dispatch(actionCreators.getStaffType());
    }
  },
  getRole(role) {
    if(role.toJS().length === 0) {
      dispatch(actionCreators.getRole());
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main))