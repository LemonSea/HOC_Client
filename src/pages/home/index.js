import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide
} from './style';

import SliderBox from './common/SliderBox';
import JobMenu from './common/JobMenu';
import SearchPart from './common/SearchBox';


import TabBoxFirm from './common/TabBox-Firm';
import TabBoxStaff from './common/TabBox-Staff';


class Home extends Component {
  
  componentDidMount() {
    this.props.getFirmRecommend()
    this.props.getStaffRecommend()
  }

  render() {

     // dispatch to props
     const { } = this.props;
     // state to props
     const { firmRecommendList,staffRecommendList } = this.props;
     const firmRecommendListJS = firmRecommendList ? firmRecommendList.toJS() : [];
     const staffRecommendListJS = staffRecommendList ? staffRecommendList.toJS() : [];

    return (
      <div style={{ marginTop: 10 }}>
        <HomeWrapper>
          <SearchPart />

          <HomeAdvertise>
            <JobMenu />
            <SliderBox />
          </HomeAdvertise>

          <TabBoxFirm history={this.props.history} recommendList={firmRecommendListJS}/>
          
          <TabBoxStaff history={this.props.history} staffRecommendList={staffRecommendListJS} />
        <div style={{ textAlign: 'center', height:'50px',  color: '#777' }}></div>
        </HomeWrapper>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  firmRecommendList: state.getIn(['homeReducer', 'firmRecommend','list']),
  staffRecommendList: state.getIn(['homeReducer', 'staffRecommend','list']),
})

const mapDispatchToProps = (dispatch) => ({
  getFirmRecommend(staffType) {
    dispatch(actionCreators.getFirmRecommend());
  },
  getStaffRecommend(staffType) {
    dispatch(actionCreators.getStaffRecommend());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default Home;