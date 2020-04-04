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