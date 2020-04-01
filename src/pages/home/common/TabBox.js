import React, { Component } from 'react';
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
const operations = <Button>Extra Action</Button>;

class TabBox extends Component {

  render() {
    return (
      <CommonBox>
        <Divider style={{ fontSize: 30 }}>好评公司</Divider>
        <Tabs tabBarExtraContent={operations}>
          <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
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