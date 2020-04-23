import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';
import { reqDeleteBrandFavorites } from '../api';
import { PAGE_SIZE, BASE_IMG_URL } from '../../../utils/constant';
import moment from 'moment';

import { List, Avatar, Icon, Button, message, Modal } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


class BrandFavoritesList extends Component {

  details = (item) => {
    console.log(item)
    this.props.history.push('/staffDetail', { item: item })
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
    // console.log('listData',listData)
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
          let item = data.company;
          console.log('item',item)
          return (
            <List.Item
              key={item._id}
              actions={[
                <Button onClick={() => { this.details(item) }}>查看详情</Button>,
                // <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
                // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                // <IconText type="message" text="2" key="list-vertical-message" />,
                <IconText type="carry-out" text={'员工数量：' + item.staffCount} key="list-vertical-message" />,
                <Button type='default' onClick={() => { this.deleteCompanyFavorites(item._id) }}><span className="iconfont" style={{ color: '#FFC347' }}>&#xe8b9;</span>&ensp;取消收藏</Button>
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
                // avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.name}</a>}
                description={item.describe}
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
          )
        }}

      />
    )
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.getIn(['loginReducer', 'currentUser']),
  list: state.getIn(['favoritesReducer', 'companyList']),
  // page total
  total: state.getIn(['favoritesReducer', 'companyTotal']),
  pageNum: state.getIn(['favoritesReducer', 'companyPageNum'])
})

const mapDispatchToProps = (dispatch) => ({
  getList(user, pageNum) {
    dispatch(actionCreators.getBrandFavoritesList(user, pageNum, PAGE_SIZE));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandFavoritesList)