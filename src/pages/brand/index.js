import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';

import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide
} from './style';

import SearchPart from './common/SearchBox';
import FilterCondition from './common/FilterCondition';
import BrandList from './common/BrandList';

class Brand extends Component {
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

          <BrandList />
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
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Brand)
// export default Brand;