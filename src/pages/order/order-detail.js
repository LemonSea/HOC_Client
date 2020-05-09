import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators as staffDetailActionCreators } from '../staffDetail/store';
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
  Button,
  Rate,
  Steps,
  message,
  Radio,
  DatePicker, List, Divider, Avatar, Descriptions, Carousel
} from 'antd';
import LinkButton from '../../components/link-button';

const { Option } = Select;
const { Step } = Steps;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class OrderDetail extends Component {

  componentDidMount() {
    const _id = this.props.location.state.item._id;
    this.props.getOrderDetail(_id);
  }

  render() {
    // const { item } = this.props.location.state
    // console.log('AppointmentPay', item)

    // dispatch to props
    const { } = this.props;

    // state to props
    const { currentUser, orderDetail } = this.props;
    const currentUserJS = currentUser ? currentUser.toJS() : [];
    const item = orderDetail ? orderDetail.toJS() : [];

    let statusText;
    if(item.status === 0) {
      statusText = '待支付'
    } else if(item.status === 1) {
      statusText = '已支付，待完成'
    } else if(item.status === 2) {
      statusText = '已完成，待评论'
    }else if(item.status === 3) {
      statusText = '完成'
    } else {
      statusText = '已取消'
    }
    // 左侧
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>订单详情</span>
        {/* <span>{isUpdate ? '修改员工信息' : '添加员工'}</span> */}
      </span>
    )

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} >
        <Card
          title={title}
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          {/* <Steps>
            <Step status="finish" title="核对订单" icon={<Icon type="solution" />} />
            <Step status="finish" title="支付费用" icon={<Icon type="money-collect" />} />
            <Step status="finish" title="完成订单" icon={<Icon type="lock" />} />
            <Step status="process" title="评价" icon={<Icon type="loading" />} />
          </Steps> */}

          <List
            size="large"
            bordered
            itemLayout="vertical"
            size="large"
          >

            <List.Item
              key={item.title}
            >
              <List.Item.Meta
                title={<a href={item.href}>{'订单编号：' + item._id}</a>}
              />
              开始时间：{moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}
               &emsp; |&emsp;
               结束时间：{moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')}
            &emsp; |&emsp;
            总时间：{item.countTime ? item.countTime.countHours + ' hours' : ''}
              <br />
              <br />
              服务地址：{item.serviceAddress ? item.serviceAddress.areaStr + item.serviceAddress.detailAddress : ''}
            &emsp; |&emsp;
            下单时间：{moment(item.firstTime).format('YYYY-MM-DD HH:mm:ss')}
            &emsp; |&emsp;
            消费金额：{item.amount}&ensp;元
              <br />
              <br />
              服务公司：{item.company ? item.company.name : ''}
              {/* &emsp; |&emsp;
            服务类型：终点工 */}
            &emsp; |&emsp;
            服务人员：{item.employee ? item.employee.name : ''}
              <br />
              <br />
            订单状态:
            <Button type='default' style={{marginLeft:10}}>{statusText}</Button>
            </List.Item>
          </List>
        </Card>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  currentUser: state.getIn(['loginReducer', 'currentUser']),
  orderDetail: state.getIn(['staffDetailReducer', 'orderDetail']),
})

const mapDispatchToProps = (dispatch) => ({
  getOrderDetail(_id) {
    dispatch(staffDetailActionCreators.getOrderDetail(_id));
  },
})

// const WrappedRegistrationForm = Form.create({ name: 'appointment-pay' })(OrderDetail);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(OrderDetail))