import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  Tabs,
  Button,
  Icon,
  Col, Row, Card
} from 'antd'

import {
  CommonBox,
  BoxTitle
} from '../style';
import { BASE_IMG_URL } from '../../../utils/constant';

const { Meta } = Card;

class TabBox extends Component {

  details = (item) => {
    console.log(item)
    this.props.history.push('/brandDetail', { item: item })
  }

  render() {
    const { recommendList } = this.props;

    return (
      <CommonBox >
        
        <Divider style={{ fontSize: 30 }}>好评公司</Divider>

        <Row gutter={16}>
          {recommendList.map((item, index) => {
            return (
              <Col key={item._id} span={6}>
                <div style={{ background: '#ECECEC', padding: '2px' }}>
                  <Card
                    title={item.name}
                    bordered={false}
                    // hoverable
                    style={{ marginBottom: 10 }}
                  // cover={<img alt={item.name} src={BASE_IMG_URL + item.imgs[0]} />}
                  >
                    {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                    <div>
                      <img
                        key={item}
                        className='staff-img'
                        alt={item.name}
                        src={BASE_IMG_URL + item.imgs[0]} ></img>
                        <div className='title'>{item.describe}</div>
                        <div style={{marginBottom:10}}>共{item.staffCount}名员工</div>
                        <Button onClick={() => { this.details(item) }}>查看详情</Button>
                    </div>
                  </Card>
                </div>
              </Col>
            )
          })}

        </Row>

         <Link to='brand'><Button type='default' style={{width: 400, height: 50, marginTop: 20}}>查看更多</Button></Link> 
      </CommonBox>
    )
  }
}

export default TabBox;