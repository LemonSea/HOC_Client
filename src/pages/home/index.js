import React, { Component } from 'react';
import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide,
  HomeMain,
  SlideBox
} from './style';


class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeAdvertise>
          <HomeSide>
          </HomeSide>
          <HomeMain>
            <SlideBox className='sl-1'>
              <img src='https://img.bosszhipin.com/beijin/upload/image/20191225/3f7fda0998317f22ec614bfc392848b9.jpg?x-oss-process=image/format,jpg'></img>
            </SlideBox>
            <SlideBox className='sl-2'>
              <img src='https://img.bosszhipin.com/beijin/upload/image/20191225/719b5568228bda8229408e1401457f13.jpg?x-oss-process=image/format,jpg' />
            </SlideBox>
            <SlideBox className='sl-3'>
              <img src='https://img.bosszhipin.com/beijin/upload/image/20191225/631e45e84ab482efaaf0a2bafb4d9219.jpg?x-oss-process=image/format,jpg' />
            </SlideBox>
            <SlideBox className='sl-4'>
              <img src='https://img.bosszhipin.com/beijin/upload/image/20191225/35f18357bbff0625465bb716d94f336a.jpg?x-oss-process=image/format,jpg' />
            </SlideBox>
            <SlideBox className='sl-5'>
              <img src='https://img.bosszhipin.com/beijin/upload/image/20191225/f1ab4555112c48503c7fdd8712531102.jpg?x-oss-process=image/format,jpg' />
            </SlideBox>
          </HomeMain>
        </HomeAdvertise>
      </HomeWrapper>
    )
  }
}

export default Home;