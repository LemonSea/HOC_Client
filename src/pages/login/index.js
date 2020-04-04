import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Card,
  Form,
  Input,
  Icon,
  Select,
  Button,
  Steps,
  message
} from 'antd';
import LinkButton from '../../components/link-button';

// import { addUserHead, addCompany, addCompanyAuditRecord } from './api'

const { Option } = Select;
const { Step } = Steps;

class Login extends Component {

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
        console.log(values)
        this.props.postLoginDispatch(values)
        message.success('登录成功!');
        this.props.history.push('/home')
        // const result = await addUserHead(officer)
        // if (result.status === 0) {
        //   message.success('注册失败!');
        // } else {
        //   message.warn('注册失败!');
        // }
      }
    }
    )
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
          title="登录"
          bordered={true}
          style={{ maxWidth: 500, margin: '0 auto' }}
          extra={<a href="/register">register</a>}
          headStyle={{ fontSize: 20 }}
        >

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
                  }
                ],
              })(<Input.Password />)}
            </Form.Item>

            <Form.Item {...buttonFormItemLayout}>
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
  postLoginDispatch(FormData) {
    dispatch(actionCreators.postLoginRequest(FormData));
  }
})

const WrappedRegistrationForm = Form.create({ name: 'login' })(Login);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))