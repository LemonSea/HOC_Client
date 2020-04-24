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
  Button,
  Rate,
  Steps,
  message,
  Radio,
  DatePicker, List, Divider, Avatar, Descriptions, Carousel
} from 'antd';
import LinkButton from '../../components/link-button';
import AppointmentForm from './appointment-form';
import { reqAddOrderComments } from './api'

const { Option } = Select;
const { Step } = Steps;
const { TextArea } = Input;
const desc = ['1分', '2分', '3分', '4分', '5分'];

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class AppointmentPay extends Component {

  state = {
    radioValue: 1,
    star: 0,
    selectOption: '',
    inductionTime: ''
  };

  handleCancel = () => {
    // console.log('handleCancel')
    // message.warning('请在三天内完成支付！')
    // this.props.history.push('/home')
    this.props.history.goBack()
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (this.state.star != 0) {
        let text = '服务不错，态度认真，好评！';
        let formData = {
          satisfaction: this.state.star === 0 ? 5 : this.state.star,
          comments: values.comments ? values.comments : text,
          user:  this.props.currentUser.toJS()._id,
          order: this.props.location.state.item._id,
          staff: this.props.location.state.item.employee._id,
          company: this.props.location.state.item.company._id,

        }
        const result = await reqAddOrderComments(formData)
        if (result.status === 0) {
          console.log(result.data)
          message.success('订单评论成功!');
          this.props.history.push('/home')
          // this.props.history.push('/appointment-pay', { item: result.data })
          // console.log('formData',formData)
        } else {
          message.warn('出错啦!');
        }
      } else {
        message.info('请先打分！')
      }
    }
    )
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  // 评分
  handleRateChange = value => {
    this.setState({ star: value });
  };

  componentDidMount() {
    const _id = this.props.location.state.item._id;
    this.props.getOrderDetail(_id);
  }

  render() {

    // const { item } = this.props.location.state
    // console.log('AppointmentPay', item)

    // dispatch to props
    const { } = this.props;

    const { star } = this.state;

    // state to props
    const { currentUser, orderDetail } = this.props;
    const currentUserJS = currentUser ? currentUser.toJS() : [];
    const item = orderDetail ? orderDetail.toJS() : [];

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },  // 左侧 label 宽度
      wrapperCol: { span: 12 }  // 右侧包裹的宽度
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const buttonFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 22,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 7,
        },
      },
    };

    
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} >
        <Card
          title="评价"
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          <Steps>
            <Step status="finish" title="核对订单" icon={<Icon type="solution" />} />
            {/* <Step status="process" title="Login" icon={<Icon type="solution" />} /> */}
            <Step status="finish" title="支付费用" icon={<Icon type="money-collect" />} />
            <Step status="finish" title="完成订单" icon={<Icon type="lock" />} />
            <Step status="process" title="评价" icon={<Icon type="loading" />} />
          </Steps>

          <List
            size="large"
            bordered
            itemLayout="vertical"
            size="large"
          >

            <List.Item
              key={item.title}
            // actions={[
            //   <IconText type="star-o" text={'星级：' + item.star} key="list-vertical-star-o" />,
            //   // <IconText type="like-o" text="156" key="list-vertical-like-o" />,
            //   <IconText type="money-collect" text={'总时长：' + item.countTime.countHours + '小时'} key="list-vertical-message" />,
            //   <IconText type="money-collect" text={'总费用：' + item.costHour * item.countTime.countHours + '元'} key="list-vertical-message" />,
            //   // <IconText type="carry-out" text={'当前状态：' + item.status === 0 ? '空闲' : '忙碌'} key="list-vertical-message" />,
            // ]}
            >
              <List.Item.Meta
                title={<a href={item.href}>{'订单编号：' + item._id}</a>}
              // description={'员工简介：' + item.introduction}
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
            订单状态：<Button type='danger'>已完成</Button>
            </List.Item>
          </List>


          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label='订单评分:'>
              {getFieldDecorator('star', {
                initialValue: star,
                // rules: [{ required: true, message: '必须输入星级!' }],
              })(
                <span>
                  <Rate tooltips={desc} onChange={this.handleRateChange} value={star} />
                  {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ''}
                </span>)}
            </Form.Item>

            <Form.Item label='服务评论:'>
              {getFieldDecorator('comments', {
                // initialValue: item.address,
              })(<TextArea placeholder='服务评论' autosize={{ minRows: 2, maxRows: 6 }} />)}
            </Form.Item>


            <Form.Item {...buttonFormItemLayout}>
              <Button type="default" onClick={this.handleCancel} style={{ width: 100, margin: 10 }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: 100, margin: 10 }}>
                确认
              </Button>
            </Form.Item>
          </Form>
          
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
  getOfficer(data) {
    dispatch(actionCreators.getOfficer(data));
  },
  getOrderDetail(_id) {
    dispatch(actionCreators.getOrderDetail(_id));
  },
})

const WrappedRegistrationForm = Form.create({ name: 'appointment-pay' })(AppointmentPay);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))