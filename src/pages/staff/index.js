import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { PAGE_SIZE } from '../../utils/constant';

import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide
} from './style';

import SearchPart from './common/SearchBox';
import FilterCondition from './common/FilterCondition';
import StaffList from './common/StaffList';

class Staff extends Component {

  componentDidMount() {
    this.props.getList(1, '', '', this.props.currentUser.toJS())
  }
  
  render() {
    
     // dispatch to props
     const { } = this.props;
     // state to props
     const { staffType } = this.props;
     const staffTypeJS = staffType ? staffType.toJS() : [];

    return (
      <div style={{ marginTop: 10 }}>
        <HomeWrapper>
          <SearchPart />

          <FilterCondition staffType={staffTypeJS} />

          <StaffList />
          {/* <HomeAdvertise>
            <JobMenu />
            <SliderBox />
          </HomeAdvertise> */}

        <div style={{ textAlign: 'center', height:'50px',  color: '#777' }}></div>
        </HomeWrapper>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  staffType: state.getIn(['mainReducer', 'staffType']),

  currentUser: state.getIn(['loginReducer', 'currentUser']),
  list: state.getIn(['staffReducer', 'list']),
  // page total
  total: state.getIn(['staffReducer', 'total']),
  pageNum: state.getIn(['staffReducer', 'pageNum']),
  searchType: state.getIn(['staffReducer', 'searchType']),
  searchName: state.getIn(['staffReducer', 'searchName']),
})

const mapDispatchToProps = (dispatch) => ({
  getList(pageNum, searchType, searchName, user) {
    console.log( user.isHead)
    let _id = '';
    if(user.isHead){
      _id = user._id
    }
    if (searchName) {
      dispatch(actionCreators.searchList(pageNum, PAGE_SIZE, searchType, searchName, _id));
    }
    else {
      dispatch(actionCreators.reqList(pageNum, PAGE_SIZE, _id));
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
// export default Brand;