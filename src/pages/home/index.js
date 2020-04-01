import React, { Component } from 'react';

import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide
} from './style';

import SliderBox from './common/SliderBox';
import JobMenu from './common/JobMenu';
import TabBox from './common/TabBox';


class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeAdvertise>
          <JobMenu />
          <SliderBox />
        </HomeAdvertise>

        <TabBox />
      </HomeWrapper>

      // <div>Home</div>
    )
  }
}

export default Home;