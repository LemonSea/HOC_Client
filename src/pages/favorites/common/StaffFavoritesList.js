import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';
import { reqDeleteStaffFavorites } from '../api';
import { PAGE_SIZE, BASE_IMG_URL } from '../../../utils/constant';
import moment from 'moment';

import { List, Avatar, Icon, Button, message, Modal } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


class StaffFavoritesList extends Component {

  details = (item) => {
    console.log(item)
    this.props.history.push('/staffDetail', { item: item })
  }

  // 取消收藏
  deleteStaffFavorites = async (staff) => {
    const user = this.props.currentUser.toJS()._id
    const data = {
      user,
      staff
    }
    const result = await reqDeleteStaffFavorites(data)
    if (result.status === 0) {
      message.success('取消收藏成功!');
      this.props.getList(user, this.props.pageNum)
    } else if (result.status === 2) {
      message.warn(result.data);
    }
    else {
      message.warn('取消收藏失败!');
    }
  }

  componentDidMount() {
    const user = this.props.currentUser.toJS()._id;
    this.props.getList(user, 1)
  }

  render() {

    const { getList } = this.props;
    // state to props
    const { list, total } = this.props;
    const listJS = list ? list.toJS() : [];

    // list 内容
    const listData = listJS;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          current: this.props.pageNum,
          total,
          showQuickJumper: true,
          onChange: (pageNum) => {
            const user = this.props.currentUser.toJS()._id;
            getList(user, pageNum)
          },
          pageSize: PAGE_SIZE,
        }}
        dataSource={listData}
        footer={
          <div>
            {/* <b>ant design</b> footer part */}
          </div>
        }
        renderItem={data => {
          let item = data.staff;
          return (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
                // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                <IconText type="message" text="2" key="list-vertical-message" />,
                // <IconText type="carry-out" text={item.status === 0 ? '空闲' : '忙碌'} key="list-vertical-message" />,
                <Button onClick={() => { this.details(item) }}>查看详情</Button>,
                // <Button type='default' icon='star' onClick={() => this.addStaffFavorites(item._id)}>收藏</Button>,
                <Button type='default' onClick={() => { this.deleteStaffFavorites(item._id) }}><span className="iconfont" style={{ color: '#FFC347' }}>&#xe8b9;</span>&ensp;取消收藏</Button>

              ]}
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
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.name}</a>}
                description={item.introduction}
              />
            所在公司：{item.company['name']}
            &emsp; |&emsp;
            职业类型：{item.staffStatus['name']}
            &emsp; |&emsp;
            费用：{item.costHour}
            &emsp; |&emsp;
              {/* 入职时间：{item.inductionTime} */}
            入职时间：{moment(item.inductionTime).format('YYYY-MM-DD')}
              <br />
              <br />
            年龄：{item.age}
            &emsp; |&emsp;
            性别：{item.gender === 0 ? '女' : '男'}
              <br />
              <br />
            工作地址：{item.address}
            &emsp; |&emsp;
            总订单数：{item.orderCount}
            &emsp; |&emsp;
            好评订单数：{item.highPraiseOrder}
            &emsp; |&emsp;
            费用：{item.costHour} 元/小时
            </List.Item>
          )
        }}
      />
    )
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.getIn(['loginReducer', 'currentUser']),
  list: state.getIn(['favoritesReducer', 'staffList']),
  // page total
  total: state.getIn(['favoritesReducer', 'staffTotal']),
  pageNum: state.getIn(['favoritesReducer', 'staffPageNum'])
})

const mapDispatchToProps = (dispatch) => ({
  getList(user, pageNum) {
    dispatch(actionCreators.getStaffFavoritesList(user, pageNum, PAGE_SIZE));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StaffFavoritesList)