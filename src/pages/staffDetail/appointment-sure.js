import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Card,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Steps,
  message,
  Radio,
  DatePicker, List, Divider, Avatar, Descriptions, Carousel
} from 'antd';
import LinkButton from '../../components/link-button';
import AppointmentForm from './appointment-form';
import { reqAddOrder } from './api'

const { Option } = Select;
const { Step } = Steps;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class AppointmentSure extends Component {

  orderSub = () => {
    this.form.validateFields(async (err, value) => {
      if (!err) {

        const { currentUser } = this.props;
        const currentUserJS = currentUser ? currentUser.toJS() : [];
        const { item } = this.props.location.state
        console.log('orderSub', value)
        const formData = {
          user: currentUserJS._id,
          employee: item._id,
          company: item.company._id,
          address: value.address,
          phone : {
            phone: value.phone,
            prefix: value.prefix
          },
          amount: item.costHour * item.countTime.countHours,
          startTime: item.startTime,
          endTime:item.endTime,
          countTime: item.countTime,
          status: 0,
          note: value.describe,
          firstTime: new Date()
        }
        const result = await reqAddOrder(formData)
        console.log('add order', formData)
        if (result.status === 0) {
          console.log(result.data)
          message.success('提交订单成功!');
          this.props.history.push('/appointment-pay', { item: result.data })
          console.log('formData',formData)
        } else {
          message.warn('提交订单失败!');
        }
      }
    })
  }

  // computationTime = (start, end) => {
  //   let startTime = new Date(start); // 开始时间
  //   let endTime = new Date(end); // 结束时间
  //   console.log('computationTime',startTime)
  //   console.log('computationTime',endTime)
  //   let usedTime = endTime - startTime; // 相差的毫秒数
  //   let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
  //   let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
  //   let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
  //   let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
  //   let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
  //   // return days + '天' + hours + '时' + minutes + '分';
  //   return {
  //     days,
  //     hours,
  //     minutes
  //   }
  // }

  render() {

    const { item } = this.props.location.state
    console.log('AppointmentSure', item)

    // dispatch to props
    const { } = this.props;

    // state to props
    const { currentUser } = this.props;
    const currentUserJS = currentUser ? currentUser.toJS() : [];

    // const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} >
        <Card
          title="确认订单信息"
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          <Steps>
            <Step status="process" title="核对订单" icon={<Icon type="loading" />} />
            {/* <Step status="process" title="Login" icon={<Icon type="solution" />} /> */}
            <Step status="wait" title="支付费用" icon={<Icon type="money-collect" />} />
            <Step status="wait" title="完成订单" icon={<Icon type="lock" />} />
            <Step status="wait" title="评价" icon={<Icon type="smile-o" />} />
          </Steps>

          <List
            size="large"
            bordered
            itemLayout="vertical"
            size="large"
          >

            <List.Item
              key={item.title}
              actions={[
                <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
                // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                <IconText type="money-collect" text={'总时长：' + item.countTime.countHours + '小时'} key="list-vertical-message" />,
                <IconText type="money-collect" text={'总费用：' + item.costHour * item.countTime.countHours + '元'} key="list-vertical-message" />,
                // <IconText type="carry-out" text={'当前状态：' + item.status === 0 ? '空闲' : '忙碌'} key="list-vertical-message" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{'员工名称：' + item.name}</a>}
              // description={'员工简介：' + item.introduction}
              />
           公司：{item.company['name']}
            &emsp; |&emsp;
            职业类型：{item.staffStatus['name']}
              {/* &emsp; |&emsp;
            费用：{item.costHour} 元/小时 */}
            &emsp; |&emsp;
            预约时间：{item.startTime} -- {item.endTime}
              <br />
              <br />
            年龄：{item.age}
            &emsp; |&emsp;
            性别：{item.gender === 0 ? '女' : '男'}
            &emsp; |&emsp;
            计费方式：{item.costHour + '元/小时'}
              {/* <br />
              <br />
            工作地址：{item.address}
            &emsp; |&emsp;
            总订单数：{item.orderCount}
            &emsp; |&emsp;
            好评订单数：{item.highPraiseOrder} */}
              <br />
              <br />
            预约电话：{item.company.phone1.prefix1 + '+' + item.company.phone1.phone1}

            </List.Item>

            <List.Item>
              <AppointmentForm
                item={item}
                setForm={(form) => { this.form = form }}
                currentUser={currentUserJS}
              />
            </List.Item>
            <List.Item>
              <Button type="primary" onClick={this.orderSub} style={{ width: 100, margin: 10 }}>
                提交订单
              </Button>
            </List.Item>
          </List>

        </Card>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  currentUser: state.getIn(['loginReducer', 'currentUser']),
})

const mapDispatchToProps = (dispatch) => ({
  getOfficer(data) {
    dispatch(actionCreators.getOfficer(data));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AppointmentSure))