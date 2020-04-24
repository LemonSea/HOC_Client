import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';
import { PAGE_SIZE, BASE_IMG_URL } from '../../../utils/constant';

import { List, Avatar, Icon, Button } from 'antd';

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




class BrandList extends Component {

  details = (item) => {
    console.log(item)
    this.props.history.push('/brandDetail', { item: item })
  }

  componentDidMount() {
    this.props.getList(1, '', '', this.props.currentUser.toJS())
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
          onChange: (pageNum) => { getList(pageNum, this.props.currentUser.toJS()) },
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
            key={item._id}
            actions={[
              <Button onClick={() => { this.details(item) }}>查看详情</Button>,
              // <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
              // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              // <IconText type="message" text="2" key="list-vertical-message" />,
              <IconText type="carry-out" text={'员工数量：' + item.staffCount} key="list-vertical-message" />,
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
            公司地址：{item.areaStr + item.detailAddress}
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
        )}
      />
    )
  }
}
const mapStateToProps = (state) => ({
  staffType: state.getIn(['mainReducer', 'staffType']),

  currentUser: state.getIn(['loginReducer', 'currentUser']),
  list: state.getIn(['brandReducer', 'list']),
  // page total
  total: state.getIn(['brandReducer', 'total']),
  pageNum: state.getIn(['brandReducer', 'pageNum'])
})

const mapDispatchToProps = (dispatch) => ({
  getList(pageNum, searchType, searchName, user) {
    // let _id = '';
    // if (searchName) {
    //   dispatch(actionCreators.searchList(pageNum, PAGE_SIZE, searchType, searchName, _id));
    // }
    // else {
    //   dispatch(actionCreators.reqList(pageNum, PAGE_SIZE, _id));
    // }    
    dispatch(actionCreators.reqList(pageNum, PAGE_SIZE));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)