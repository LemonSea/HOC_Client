import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { PAGE_SIZE, BASE_IMG_URL } from '../../utils/constant';
import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide
} from './style';
import { List, Avatar, Icon, Button, Descriptions, Carousel } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
function onChange(a, b, c) {
  console.log(a, b, c);
}
class BrandDetail extends Component {

  render() {

    const { item } = this.props.location.state
    console.log(item)

    const { } = this.props;
    // state to props
    const { } = this.props;

    return (
      <HomeWrapper style={{ marginTop: 10 }}>
        <List
          size="large"
          bordered
          itemLayout="vertical"
          size="large"
          footer={
            <div>
              <b>公司介绍:</b> {item.name}
            </div>
          }
        // dataSource={data}
        // renderItem={item => <List.Item>{item}</List.Item>}
        >

          <List.Item
            key={item.title}
          // actions={[
          //   <IconText type="star-o" text="156" key="list-vertical-star-o" />,
          //   <IconText type="like-o" text="156" key="list-vertical-like-o" />,
          //   <IconText type="message" text="2" key="list-vertical-message" />,
          // ]}
          extra={
            <img
              width={150}
              height={150}
              alt="img"
              src={BASE_IMG_URL + item.imgs[0]}
            />
          }
          >
            <List.Item.Meta
              avatar={<Avatar src={BASE_IMG_URL + item.Officer.avatar} />}
              title={item.title}
              description={item.description}
            />
            {item.content}
          </List.Item>

          <List.Item>
            <Descriptions title="User Info">
              <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
              <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
              <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
              <Descriptions.Item label="Remark">empty</Descriptions.Item>
              <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
            </Descriptions>
          </List.Item>

        </List>
      </HomeWrapper>
    )
  }
}
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail)