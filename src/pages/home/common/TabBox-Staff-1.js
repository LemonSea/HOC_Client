import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  Tabs,
  Button,
  Icon
} from 'antd'
import {
  CommonBox,
  BoxTitle
} from '../style';

const { TabPane } = Tabs;
const operations = <Link to="/staff"><Button onClick={() => {}}>Extra Action</Button></Link>;

class TabBox extends Component {

  callback = (key) => {
    console.log(key);
  }

  render() {
    return (
      <CommonBox>
        <Divider style={{ fontSize: 30 }}>推荐员工</Divider>
        <Tabs tabBarExtraContent={operations} onChange={this.callback}>
          <TabPane tab="Tab 1" key="1">
            Content of tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of tab 3
          </TabPane>
        </Tabs>
      </CommonBox>
    )
  }
}

export default TabBox;