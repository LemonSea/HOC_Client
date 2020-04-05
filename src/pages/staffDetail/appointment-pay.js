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

class AppointmentPay extends Component {


  handleCancel = () => {
    // console.log('handleCancel')
    message.warning('请在三天内完成支付！')
    this.props.history.push('/home')
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log(values)
        this.props.history.push('/appointment-done')
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


  render() {

    const { item } = this.props.location.state
    console.log('AppointmentPay', item)

    // dispatch to props
    const { } = this.props;

    // state to props
    const { currentUser } = this.props;
    const currentUserJS = currentUser ? currentUser.toJS() : [];

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
          title="确认支付"
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
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>


            <Form.Item label="Account" hasFeedback>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your account!',
                  }
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Password" hasFeedback>
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
})

const mapDispatchToProps = (dispatch) => ({
  getOfficer(data) {
    dispatch(actionCreators.getOfficer(data));
  }
})

const WrappedRegistrationForm = Form.create({ name: 'appointment-pay' })(AppointmentPay);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))