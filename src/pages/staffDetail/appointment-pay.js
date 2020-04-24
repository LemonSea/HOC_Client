import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Card,
  Form,
  Input,
  Modal,
  Icon,
  Steps,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  message,
  Radio,
  DatePicker, List, Divider, Avatar, Descriptions, Carousel
} from 'antd';
import LinkButton from '../../components/link-button';
import AppointmentForm from './appointment-form';
import { reqChangeOrder } from './api';

const { Option } = Select;
const { Step } = Steps;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class AppointmentPay extends Component {

  
  /**
   * 完成订单
   */
  changeStatus = (_id, status) => {
    Modal.confirm({
      title: `确定支付?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        const result = await reqChangeOrder(_id, status)
        console.log('result', result)
        if (result.status === 0) {
          message.success('支付成功!');
          console.log(result)
          // this.props.getList(pageNum,'','', this.props.currentUser.toJS())
        } else {
          message.warn('发生了错误!');
        }
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  }


  // 取消支付
  handleCancel = () => {
    // console.log('handleCancel')
    message.warning('请在三天内完成支付！')
    this.props.history.push('/home')
  }

  // 确认支付
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const _id = this.props.location.state.item._id;
        this.changeStatus(_id,1)
        this.props.history.push('/home')
        // this.props.history.push('/appointment-done')
        // this.props.history.push('/appointment-finish', { item: this.props.location.state.item })
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


  componentDidMount() {
    const _id = this.props.location.state.item._id;
    this.props.getOrderDetail(_id);
  }

  render() {


    // dispatch to props
    const { } = this.props;

    // state to props
    const { currentUser,orderDetail } = this.props;
    const currentUserJS = currentUser ? currentUser.toJS() : [];
    const item = orderDetail ? orderDetail.toJS() : [];
    // const { item } = this.props.location.state
    // console.log('AppointmentPay', item)

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

    // 左侧
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>确认支付</span>
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
          <Steps>
            <Step status="finish" title="核对订单" icon={<Icon type="solution" />} />
            {/* <Step status="process" title="Login" icon={<Icon type="solution" />} /> */}
            <Step status="process" title="支付费用" icon={<Icon type="loading" />} />
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
            消费金额：{item.amount}
              <br />
              <br />
            消费者电话：{item.phone ?  item.phone.prefix + '+' + item.phone.phone : ''}
            </List.Item>
          </List>


          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item label="支付方式：" style={{marginTop:20}} hasFeedback>
              {getFieldDecorator('paymentMethod', {
                initialValue: 'balance'
              })(<Select
                style={{ width: 150 }}
                // onChange={(value) => { changeSearchType(value) }}
              >
                <Option value='balance'>零钱</Option>
                <Option value='CCBDebit Card'>建设银行卡</Option>
              </Select>)}

            </Form.Item>

            <Form.Item label="支付密码：" style={{marginTop:20}} hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ],
              })(<Input.Password />)}

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