import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

import {
  BackTop,
  Affix
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

class Main extends Component {

  state = {
    top: 0,
    bottom: 10,
  };

  componentWillMount() {
    this.props.getStaffType(this.props.staffType)
  }

  render() {
    // dispatch to props
    const { } = this.props;
    // state to props
    const { } = this.props;

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

          <Route component={NotFound} />
        </Switch>
        <BackTop />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  staffType: state.getIn(['mainReducer', 'staffType']),
})

const mapDispatchToProps = (dispatch) => ({
  getStaffType(staffType) {
    if(staffType.toJS().length === 0) {
      dispatch(actionCreators.getStaffType());
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)