import React, { Component } from 'react';
import {
  HomeSide,
  MenuLine
} from '../style';


class JobMenu extends Component {
  render() {
    return (
      <HomeSide>
        <MenuLine>全国月嫂<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国育儿嫂<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国保姆<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国保洁<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国管家<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国钟点工<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国催乳师<span className="iconfont">&#xe61f;</span></MenuLine>
      </HomeSide>
    )
  }
}

export default JobMenu;