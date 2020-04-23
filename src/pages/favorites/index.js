import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { PAGE_SIZE } from '../../utils/constant';

import {
  Card,
  Icon,
  Tabs
} from 'antd';
import LinkButton from '../../components/link-button';
// import {
//   HomeWrapper,
//   HomeAdvertise,
//   HomeSide
// } from './style';

import StaffFavoritesList from './common/StaffFavoritesList';

const { TabPane } = Tabs;

class Staff extends Component {


  callback = (key) => {
    console.log('Tabs', key);
  }

  componentDidMount() {
  }

  render() {

    // dispatch to props
    const { } = this.props;
    // state to props
    const { } = this.props;

    // 左侧
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>收藏夹</span>
      </span>
    )


    return (
      <div style={{ marginTop: 10 }}>
        <Card
          title={title}
          bordered={true}
          style={{ maxWidth: 1200, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          <Tabs defaultActiveKey="staff" onChange={this.callback}>
            <TabPane
              tab={
                <span>
                  <span className="iconfont">&#xe629;</span>&ensp;
                  员工收藏夹
                 </span>
              }
              key="staff"
            >
              <StaffFavoritesList history={this.props.history} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <span className="iconfont">&#xe679;</span>&ensp;
                  公司收藏夹
                 </span>
              }
              key="company"
            >
              公司收藏夹
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
// export default Brand;