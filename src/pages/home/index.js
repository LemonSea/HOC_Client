import React, { Component } from 'react';

import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide
} from './style';

import SliderBox from './common/SliderBox';
import JobMenu from './common/JobMenu';
import TabBox from './common/TabBox';
import SearchPart from './common/SearchBox';


class Home extends Component {
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <HomeWrapper>
          <SearchPart />
          
          <HomeAdvertise>
            <JobMenu />
            <SliderBox />
          </HomeAdvertise>

          <TabBox />
        </HomeWrapper>
        home
      </div>
    )
  }
}

export default Home;