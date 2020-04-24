import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';
import { PAGE_SIZE, BASE_IMG_URL } from '../../../utils/constant';
import moment from 'moment';

import { List, Avatar, Icon,Button } from 'antd';

// const listData = [];
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'http://ant.design',
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


class StaffList extends Component {

  details = (item) => {
    console.log(item)
    this.props.history.push('/staffDetail', { item: item })
  }

  componentDidMount() {
    this.props.getList(1)
  }

  render() {

    const { getList } = this.props;
    // state to props
    const { list, total, searchType, searchName } = this.props;
    const listJS = list ? list.toJS() : [];

    // list 内容
    const listData = listJS;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          current: this.props.pageNum,
          // onChange: page => {
          //   console.log(page);
          // },
          total,
          showQuickJumper: true,
          onChange: (pageNum) => { getList(pageNum, this.props.typeItem) },
          pageSize: PAGE_SIZE,
        }}
        dataSource={listData}
        footer={
          <div>
            {/* <b>ant design</b> footer part */}
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
              // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              // <IconText type="message" text="2" key="list-vertical-message" />,
              // <IconText type="carry-out" text={item.status === 0 ? '空闲' : '忙碌'} key="list-vertical-message" />,
              <Button onClick={() => { this.details(item) }}>查看详情</Button>,
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
              avatar={<Avatar src={BASE_IMG_URL + item.avatar} />}
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
            工作区域：{item.workAreaStr}
            {/* &emsp; |&emsp;
            总订单数：{item.orderCount} */}
            &emsp; |&emsp;
            费用：{item.costHour} 元/小时
          </List.Item>
        )}
      />
    )
  }
}
const mapStateToProps = (state) => ({
  staffType: state.getIn(['mainReducer', 'staffType']),

  currentUser: state.getIn(['loginReducer', 'currentUser']),
  list: state.getIn(['staffReducer', 'list']),
  // page total
  total: state.getIn(['staffReducer', 'total']),
  pageNum: state.getIn(['staffReducer', 'pageNum']),
  typeItem: state.getIn(['staffReducer', 'typeItem']),
})

const mapDispatchToProps = (dispatch) => ({
  getList(pageNum, typeItem) {
    console.log('typeItem',typeItem)
    if (typeItem) {
      dispatch(actionCreators.searchList(pageNum, PAGE_SIZE ,typeItem));
    }
    else {
      dispatch(actionCreators.reqList(pageNum, PAGE_SIZE));
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StaffList)