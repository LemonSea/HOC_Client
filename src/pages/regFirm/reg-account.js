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
  message
} from 'antd';
import LinkButton from '../../components/link-button';

import { addUserHead, addCompany, addCompanyAuditRecord } from './api'

const { Option } = Select;
const { Step } = Steps;

class RegAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }

  previous = () => {
    this.props.history.push('/reg-firm')
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        if (values.agreement) {
          /**
           * 注册公司负责人的信息
           */
          const officer = this.props.officer.toJS();
          officer.nickname = values.nickname;
          officer.isHead = true;
          officer.isAdmin = true;
          officer.role = '5e87fb4360916a18dcfa383b';
          officer.account = values.account;
          officer.password = values.password;
          console.log('Received officer : ', officer);
          const result = await addUserHead(officer)
          if (result.status === 0) {
            console.log('result.data', result.data._id)
            /**
             * 注册公司
             */
            const firm = this.props.firm.toJS();
            console.log('Received firm: ', firm);
            firm.Officer = result.data._id;
            const resultCompany = await addCompany(firm)
            if (resultCompany.status === 0) {
              console.log('resultCompany.data', resultCompany.data)
              /**
               * 记录公司记录
               */
              const company = resultCompany.data._id;
              const resultRecord = await addCompanyAuditRecord(company)
              if (resultRecord.status === 0) {
                message.success('注册成功!');
                this.props.history.push('/reg-done')
              }
            } else {
              message.warn('注册失败!');
            }
          } else {
            message.warn('注册失败!');
          }
        } else {
          message.warn('you mast agree to the agreement!')
        }
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

    const { current } = this.state;

    // dispatch to props
    const { } = this.props;

    // state to props
    const { firm, officer } = this.props;
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
          title="注册公司"
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          <Steps>
            <Step status="finish" title="负责人信息" icon={<Icon type="user" />} />
            {/* <Step status="process" title="Login" icon={<Icon type="user" />} /> */}
            <Step status="finish" title="公司信息" icon={<Icon type="solution" />} />
            <Step status="process" title="账号注册" icon={<Icon type="loading" />} />
            <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
          </Steps>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

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

            <Form.Item {...buttonFormItemLayout}>
              <Button type="default" onClick={this.previous} style={{ width: 100, margin: 10 }}>
                Previous
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: 100, margin: 10 }}>
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
  officer: state.getIn(['regFirmReducer', 'officer']),
  firm: state.getIn(['regFirmReducer', 'firm']),
  role: state.getIn(['regFirmReducer', 'firm']),
})

const mapDispatchToProps = (dispatch) => ({
})

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegAccount);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))