import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  HomeSide,
  MenuLine
} from '../style';


class JobMenu extends Component {
  render() {
    // dispatch to props
    const { } = this.props;

    // state to props
    const { staffType } = this.props;
    const staffTypeJS = staffType ? staffType.toJS() : [];

    return (
      <HomeSide>
        {/* {
          staffTypeJS.map(item=><MenuLine key={item.name} onClick={(e)=>{console.log(e)}}>{item.name}<span className="iconfont">&#xe61f;</span></MenuLine>)
        } */}
        {staffTypeJS.map((item, index) => {
          return (
            <Link
              key={item.name}
              // 只能传字符串，刷新页面参数不丢失
              // to={'/staff/' + item._id}
              // 可传对象，刷新页面参数丢失
              to={{
                pathname: "/staff",
                // search: "?sort=name",
                // hash: "#the-hash",
                state: { item }
              }}
            >
              <MenuLine>
                {item.name}
                <span className="iconfont">&#xe61f;</span>
              </MenuLine>
            </Link>
          )
        })
        }
        {/* <MenuLine>全国月嫂<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国育儿嫂<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国保姆<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国保洁<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国管家<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国钟点工<span className="iconfont">&#xe61f;</span></MenuLine>
        <MenuLine>全国催乳师<span className="iconfont">&#xe61f;</span></MenuLine> */}
      </HomeSide >
    )
  }
}

const mapStateToProps = (state) => ({
  staffType: state.getIn(['mainReducer', 'staffType']),
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(JobMenu))