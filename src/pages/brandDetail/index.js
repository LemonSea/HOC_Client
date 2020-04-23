import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { actionCreators as homeActionCreators } from '../home/store';
import { reqAddCompanyFavorites, reqAllCompanyFavoritesList } from './api';
import { reqDeleteBrandFavorites } from '../favorites/api';
import { PAGE_SIZE, BASE_IMG_URL } from '../../utils/constant';
import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide,

} from './style';
import { List, Divider, Avatar, Icon, Button, message } from 'antd';

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

  constructor(props) {
    super(props)
    this.state = {
      isFavorites: false
    }
  }

  // 收藏
  addStaffFavorites = async (company) => {
    const user = this.props.currentUser.toJS()._id
    const data = {
      user,
      company
    }
    const result = await reqAddCompanyFavorites(data)
    if (result.status === 0) {
      this.setState({
        isFavorites: true
      })
      message.success('收藏成功!');
    } else if (result.status === 2) {
      message.warn(result.data);
    }
    else {
      message.warn('收藏失败!');
    }
  }

  
  // 取消收藏
  deleteCompanyFavorites = async (company) => {
    const user = this.props.currentUser.toJS()._id
    const data = {
      user,
      company
    }
    const result = await reqDeleteBrandFavorites(data)
    if (result.status === 0) {
      this.setState({
        isFavorites: false
      })
      message.success('取消收藏成功!');
    } else if (result.status === 2) {
      message.warn(result.data);
    }
    else {
      message.warn('取消收藏失败!');
    }
  }

  // 获取当前用户的所有收藏信息
  getFavoritesList = async () => {
    // 获取当前用户的所有收藏信息
    const user = this.props.currentUser.toJS()._id
    const result = await reqAllCompanyFavoritesList(user)
    if (result.status === 0) {
      console.log('getFavoritesList', result)
      result.data.forEach(element => {
        if (element.company === this.props.location.state.item._id) {
          this.setState({
            isFavorites: true
          })
        }
      })
    } else {
      // message.warn('取消收藏失败!');
      console.error(result)
    }
  }

  componentDidMount() {
    const _id = this.props.location.state.item._id;
    this.props.getCompanyDetail(_id);

    this.getFavoritesList()
  }

  render() {

    // const { item } = this.props.location.state
    // console.log(item)

    const { } = this.props;
    // state to props
    const { staffRecommendList, brandDetail } = this.props;
    const item = brandDetail ? brandDetail.toJS() : [];
    console.log('item', item)

    const staffRecommendListJS = staffRecommendList ? staffRecommendList.toJS() : [];


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
        >
          <List.Item
            key={item.title}
            actions={[
              <span>
                {
                  this.state.isFavorites === false ?
                    <Button type='default' icon='star' onClick={() => this.addStaffFavorites(item._id)}>收藏</Button>
                    :
                    <Button type='default' onClick={() => this.deleteCompanyFavorites(item._id)}><span className="iconfont" style={{ color: '#FFC347' }}>&#xe8b9;</span>&ensp;取消收藏</Button>
                }
              </span>

            ]}
            extra={
              item.imgs ?
                <img
                  width={150}
                  height={150}
                  alt="img"
                  src={BASE_IMG_URL + item.imgs[0]}
                />
                : ''
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
            客服电话-1 ：{item.phone1 ? item.phone1.phone1 + '+' + item.phone1.prefix1 : ''}
            &emsp; |&emsp;
            客服电话-2：{item.phone2 ? item.phone2.phone2 + '+' + item.phone2.prefix2 : ''}
            &emsp; |&emsp;
            客服电话-3：{item.phone3 ? item.phone3.phone3 + '+' + item.phone3.prefix3 : ''}
          </List.Item>

          {/* 评论 */}
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

          {/* 好评员工 */}
          <List.Item>
            <Divider style={{ fontSize: 15 }} orientation="left">好评员工：</Divider>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={listData}
              footer={
                <div>
                </div>
              }
              renderItem={staffItem => (
                <List.Item
                  key={staffItem.title}
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
  currentUser: state.getIn(['loginReducer', 'currentUser']),

  brandDetail: state.getIn(['brandDetailReducer', 'brandDetail']),

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
  getCompanyDetail(_id) {
    dispatch(actionCreators.getCompanyDetail(_id));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetail)