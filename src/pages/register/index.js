import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators as loginActionCreators } from '../login/store';
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
  DatePicker
} from 'antd';
import LinkButton from '../../components/link-button';

const { Option } = Select;
const { Step } = Steps;

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.agreement) {

          const birthday = values['birthday'].format('YYYY-MM-DD');
          // console.log('birthday', birthday)
          values.birthday = birthday;
          values.phone = {
            phone: values.phone,
            prefix: values.prefix
          };
          values.role = '5e81fc2633001225c0cfd582';
          values.status = 1;
          console.log('Received values of form: ', values);

          this.props.postRegisterDispatch(values)
          message.success('注册成功!自动登录！');
          this.props.history.push('/home')

        } else {
          message.warn('you mast agree to the agreement!')
        }
      }
    });
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

    const { current } = this.state;

    // dispatch to props
    const { } = this.props;

    // state to props
    const { } = this.props;
    // const listJS = list ? list.toJS() : [];

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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const datePickerConfig = {
      rules: [{ type: 'object', required: true, message: 'Please select you birthday!' }],
    };

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} >
        <Card
          title="用户注册"
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          extra={<a href="/login">login</a>}
          headStyle={{ fontSize: 20 }}
        >

          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label="realName">
              {getFieldDecorator('realName', {
                rules: [{ required: true, message: 'Please input your realName!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="IDCard">
              {getFieldDecorator('IDCard', {
                rules: [{ required: true, message: 'Please input your IDCard!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="gender">
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: 'Please input your gender!' }],
              })(
                <Radio.Group>
                  <Radio value="0">女</Radio>
                  <Radio value="1">男</Radio>
                </Radio.Group>,
              )}
            </Form.Item>

            <Form.Item label="birthday">
              {getFieldDecorator('birthday', datePickerConfig)(<DatePicker />)}
            </Form.Item>

            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            {/* <Form.Item
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<Input />)}
            </Form.Item> */}

            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>

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
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}

            </Form.Item>

            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>,
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ width: 200 }}>
                Submit
              </Button>
            </Form.Item>
          </Form>

        </Card>

      </div>
    )
  }
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  postRegisterDispatch(FormData) {
    dispatch(loginActionCreators.postRegisterDispatch(FormData));
  }
})

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))