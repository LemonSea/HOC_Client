import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { actionCreators as homeActionCreators } from '../home/store';
import { PAGE_SIZE, BASE_IMG_URL } from '../../utils/constant';
import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide,

} from './style';
import { List, Divider, Avatar, Icon, Button, Descriptions, Carousel } from 'antd';

import TabBoxStaff from './common/TabBox-Staff';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const data = [
  {
    title: 'admin',
    description: '五星好评！'
  },
  {
    title: 'userA',
    description: '非常不错，我下次还用这家公司！'
  },
  {
    title: 'userV',
    description: '可以可以！'
  },
  {
    title: '2533566560',
    description: '昨天预约的，今天很准时，五星！'
  },
];

class BrandDetail extends Component {


  componentDidMount() {
    this.props.getStaffRecommend()
  }

  render() {

    const { item } = this.props.location.state
    console.log(item)

    const { } = this.props;
    // state to props
    const { staffRecommendList, list, total, } = this.props;
    const staffRecommendListJS = staffRecommendList ? staffRecommendList.toJS() : [];
    const listJS = list ? list.toJS() : [];
    console.log('staffRecommendListJS', staffRecommendListJS)

    // list 内容
    let listData = [];
    // for (let i = 0; i < 6; i++) {
    //   listData.push(staffRecommendListJS[i])
    // }
    
    return (
      <HomeWrapper style={{ marginTop: 10 }}>
        <List
          size="large"
          bordered
          itemLayout="vertical"
          size="large"
        // footer={
        //   <div>
        //     <b>公司介绍:</b> {item.name}
        //   </div>
        // }
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
              // avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{'公司名称：' + item.name}</a>}
              description={'公司介绍：' + item.describe}
            />
            公司地址：{item.address}
            &emsp; |&emsp;
            公司邮箱：{item.email}
            <br />
            <br />
            客服电话-1：{item.phone1.phone1 + '+' + item.phone1.prefix1}
            &emsp; |&emsp;
            客服电话-2：{item.phone2.phone2 + '+' + item.phone2.prefix2}
            &emsp; |&emsp;
            客服电话-3：{item.phone3.phone3 + '+' + item.phone3.prefix3}
          </List.Item>


          <List.Item>

            <Divider style={{ fontSize: 15 }} orientation="left">雇主评价</Divider>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </List.Item>


          <List.Item>
            {/* <TabBoxStaff staffRecommendList={staffRecommendListJS} /> */}
          </List.Item>

          <List.Item>
            <Divider style={{ fontSize: 15 }} orientation="left">好评员工：</Divider>
            <List
              itemLayout="vertical"
              size="large"
              // pagination={{
              //   current: this.props.pageNum,
              //   // onChange: page => {
              //   //   console.log(page);
              //   // },
              //   total,
              //   showQuickJumper: true,
              //   onChange: (pageNum) => { getList(pageNum, this.props.currentUser.toJS()) },
              //   pageSize: PAGE_SIZE,
              // }}
              dataSource={listData}
              footer={
                <div>
                  {/* <b>ant design</b> footer part */}
                </div>
              }
              renderItem={staffItem => (
                <List.Item
                  key={staffItem.title}
                // actions={[
                //   <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
                //   <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                //   <IconText type="message" text="2" key="list-vertical-message" />,
                //   <IconText type="carry-out" text={item.status === 0 ? '空闲' : '忙碌'} key="list-vertical-message" />,
                // ]}
                // extra={
                //   <img
                //     width={150}
                //     height={150}
                //     alt="img"
                //     src={BASE_IMG_URL + item.imgs[0]}
                //   />
                // }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={staffItem.avatar} />}
                    title={<a href={staffItem.href}>{staffItem.name}</a>}
                    description={staffItem.introduction}
                  />
            所在公司：{staffItem.company['name']}
            &emsp; |&emsp;
            职业类型：{staffItem.staffStatus['name']}
            &emsp; |&emsp;
            费用：{staffItem.costHour}
            &emsp; |&emsp;
            入职时间：{staffItem.inductionTime}
                  <br />
                  <br />
            年龄：{staffItem.age}
            &emsp; |&emsp;
            性别：{staffItem.gender === 0 ? '女' : '男'}
                  <br />
                  <br />
            工作地址：{staffItem.address}
            &emsp; |&emsp;
            总订单数：{staffItem.orderCount}
            &emsp; |&emsp;
            好评订单数：{staffItem.highPraiseOrder}
            &emsp; |&emsp;
            费用：{staffItem.costHour}
                </List.Item>
              )}
            />
          </List.Item>
        </List>
      </HomeWrapper >
    )
  }
}
const mapStateToProps = (state) => ({
  staffRecommendList: state.getIn(['homeReducer', 'staffRecommend', 'list']),

  list: state.getIn(['staffReducer', 'list']),
  // page total
  total: state.getIn(['staffReducer', 'total']),
  pageNum: state.getIn(['staffReducer', 'pageNum']),
  searchType: state.getIn(['staffReducer', 'searchType']),
  searchName: state.getIn(['staffReducer', 'searchName']),
})

const mapDispatchToProps = (dispatch) => ({
  getStaffRecommend(staffType) {
    dispatch(homeActionCreators.getStaffRecommend());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail)