import React, { PureComponent, memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actionCreators from './store/actionCreators';
import { actionCreators as homeActionCreators } from '../home/store';
import { reqAddStaffFavorites, reqAllStaffFavoritesList } from "./api";
import { reqDeleteStaffFavorites } from '../favorites/api';
import { PAGE_SIZE, BASE_IMG_URL } from '../../utils/constant';
import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide,

} from './style';
import { List, Divider, Avatar, Icon, Button, message, DatePicker, Descriptions, Carousel } from 'antd';

import TabBoxStaff from './common/TabBox-Staff';

const { RangePicker } = DatePicker;

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

class BrandDetail extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      startTime: '',  // 预约时间开始阶段
      endTime: '',  // 预约时间结束
      staffDetail: '',
      favoritesList: [],
      isOptional: false,
      isFavorites: false
    }
  }

  computationTime = (start, end) => {
    let startTime = new Date(start); // 开始时间
    let endTime = new Date(end); // 结束时间
    // console.log('computationTime', startTime)
    // console.log('computationTime', endTime)
    let usedTime = endTime - startTime; // 相差的毫秒数
    let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
    let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
    let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
    let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
    let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
    // return days + '天' + hours + '时' + minutes + '分';
    let countHours = days * 24 + hours;
    return {
      days,
      hours,
      minutes,
      countHours
    }
  }

  onChange = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
  }

  onOk = (value) => {
    // console.log('Formatted Selected Time onOk-s: ', moment(value[0]).format('YYYY-MM-DD HH:mm:ss'));
    // console.log('Formatted Selected Time onOk-e: ', moment(value[1]).format('YYYY-MM-DD HH:mm:ss'));
    this.setState({
      startTime: moment(value[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(value[1]).format('YYYY-MM-DD HH:mm:ss')
    }, () => {
      this.setState({
        isOptional: true
      })
    })
  }

  // 预约功能
  appointment = () => {

    let { item } = this.props.location.state;
    item['startTime'] = this.state.startTime;
    item['endTime'] = this.state.endTime;
    const countTime = this.computationTime(item.startTime, item.endTime);
    item['countTime'] = countTime;

    if (countTime.hours < 1) {
      message.warning('最少预约1小时！')
    } else {
      console.log(countTime)
      // message.success('最少预约1小时！')
      this.props.history.push('/appointment-sure', { item: item })
    }
  }

  // 收藏
  addStaffFavorites = async (staff) => {
    const user = this.props.currentUser.toJS()._id
    const data = {
      user,
      staff
    }
    const result = await reqAddStaffFavorites(data)
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
  deleteStaffFavorites = async (staff) => {
    const user = this.props.currentUser.toJS()._id
    const data = {
      user,
      staff
    }
    const result = await reqDeleteStaffFavorites(data)
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
    const result = await reqAllStaffFavoritesList(user)
    if (result.status === 0) {
      result.data.forEach(element => {
        if (element.staff === this.props.location.state.item._id) {
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
    this.props.getStaffDetail(_id);

    this.getFavoritesList()
  }

  render() {

    // const { item } = this.props.location.state
    // console.log('item', item)

    const { } = this.props;
    // state to props
    const { staffDetail } = this.props;
    const item = staffDetail ? staffDetail.toJS() : [];
    let staffStatus = item.staffStatus ? item.staffStatus : {}
    console.log(item)
    console.log('staffStatus.isAppoint', staffStatus.isAppoint)

    // console.log('staffDetailJS', item)

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
          {/* 员工详情 */}
          <List.Item
            key={item._id}
            actions={[
              <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
              // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              <IconText type="money-collect" text={'费用：' + item.costHour + '元/小时'} key="list-vertical-message" />,
              // <IconText type="carry-out" text={'当前状态：' + item.status === 0 ? '空闲' : '忙碌'} key="list-vertical-message" />,
              <span>
                {
                  this.state.isFavorites === false ?
                    <Button type='default' icon='star' onClick={() => this.addStaffFavorites(item._id)}>收藏</Button>
                    :
                    <Button type='default' onClick={() => this.deleteStaffFavorites(item._id)}><span className="iconfont" style={{ color: '#FFC347' }}>&#xe8b9;</span>&ensp;取消收藏</Button>
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
              avatar={<Avatar src={BASE_IMG_URL + item.avatar} />}
              title={<a href={item.href}>{'员工名称：' + item.name}</a>}
              description={'员工简介：' + item.introduction}
            />
           所在公司：{item.company ? item.company['name'] : ''}
            &emsp; |&emsp;
            职业类型：{item.staffStatus ? item.staffStatus['name'] : ''}
            &emsp; |&emsp;
            入职时间：{item.inductionTime}
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
            <br />
            <br />
            预约电话：{item.company ? item.company.phone1.prefix1 + '+' + item.company.phone1.phone1 : ''}

          </List.Item>

          <List.Item>
            <img src={BASE_IMG_URL + '/staff/ba-staff.png'} style={{ width: '1136px' }} />
          </List.Item>

          {/* 预约操作 */}
          {
            staffStatus.isAppoint === 1
              ? <List.Item>
                <Divider style={{ fontSize: 15 }} orientation="left">服务预约</Divider>
               温馨提示：为了确保您的服务，该类别服务暂不提供线上预约功能，请拨打客服电话进行线上预约！
               </List.Item>

              : <List.Item>
                <Divider style={{ fontSize: 15 }} orientation="left">服务预约</Divider>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['Start Time', 'End Time']}
                  onChange={this.onChange}
                  onOk={this.onOk}
                />
            &emsp; |&emsp;
            <Button
                  type='primary'
                  disabled={this.state.isOptional ? false : true}
                  onClick={this.appointment}
                >预约</Button>
            &emsp; |&emsp;
            温馨提示：请电话沟通确认时间后下单。
          </List.Item>

          }

          {/* 公司介绍 */}
          {item.company ?
            <List.Item>
              <Divider style={{ fontSize: 15 }} orientation="left">公司介绍</Divider>
              <List.Item
                key={item.company.title}
                extra={
                  <img
                    width={150}
                    height={150}
                    alt="img"
                    src={BASE_IMG_URL + item.company.imgs[0]}
                  />
                }
              >
                <List.Item.Meta
                  title={<a href={item.href}>{'公司名称：' + item.company.name}</a>}
                  description={'公司介绍：' + item.company.describe}
                />
            公司地址：{item.company.areaStr + item.company.detailAddress}
            &emsp; |&emsp;
            公司邮箱：{item.company.email}
                <br />
                <br />
            客服电话-1：{item.company.phone1.phone1 + '+' + item.company.phone1.prefix1}
            &emsp; |&emsp;
            客服电话-2：{item.company.phone2.phone2 + '+' + item.company.phone2.prefix2}
            &emsp; |&emsp;
            客服电话-3：{item.company.phone3.phone3 + '+' + item.company.phone3.prefix3}
              </List.Item>
            </List.Item>
            : ''}
          {/* 雇主评价 */}
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

          {/* 其他员工 */}
          <List.Item>
            <Divider style={{ fontSize: 15 }} orientation="left">其他员工：</Divider>
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
  currentUser: state.getIn(['loginReducer', 'currentUser']),

  staffDetail: state.getIn(['staffDetailReducer', 'staffDetail']),

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
  getStaffDetail(_id) {
    dispatch(actionCreators.getStaffDetail(_id));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(BrandDetail))