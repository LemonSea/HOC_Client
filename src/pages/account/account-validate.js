import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  Button,
  message
} from 'antd';
import LinkButton from '../../components/link-button';
import { actionCreators as loginActionCreators } from '../login/store';

import { reqUpdateUserAccount } from './api'

class accountValidate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const _id = values._id
        console.log('values', values)
        const result = await reqUpdateUserAccount(_id, values)
        if (result.status === 0) {
          console.log(result.data)
          message.success('密码修改成功，请重新登录！')
          this.props.history.push('/login')
          this.props.layoutDispatch()
        } else if(result.status === -1) {
          message.warning('不能设置重复密码！')
        } else (
          message.error('密码修改失败！')
        )
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
    const { firm, officer } = this.props;
    // const listJS = list ? list.toJS() : [];

    const { getFieldDecorator } = this.props.form;

    let _id = this.props.location.state;
    // console.log('_id', _id)

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
          title="修改密码"
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>


            <Form.Item >
              {getFieldDecorator('_id', {
                initialValue: _id,
              })(<Input disabled type='hidden' />)}
            </Form.Item>

            <Form.Item label="旧密码" hasFeedback>
              {getFieldDecorator('oldPassword', {
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

            <Form.Item label="新密码" hasFeedback>
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

            <Form.Item label="确认新密码" hasFeedback>
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

            <Form.Item {...buttonFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ width: 100, margin: 10 }}>
                保存修改
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
  layoutDispatch() {
    dispatch(loginActionCreators.postLayoutRequest());
  }
})

const WrappedRegistrationForm = Form.create({ name: 'account-validate' })(accountValidate);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))