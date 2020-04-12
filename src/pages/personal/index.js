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
import PicturesWall from './pictures-wall';

const { Option } = Select;
const { Step } = Steps;

class Personal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    this.pw = React.createRef();
  }

  cancel = () => {
    this.props.history.push('/home')
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const _id = values._id
        // console.log('this.props.location.state.item._id',this.props.location.state.item)
        const imgs = this.pw.current.getImgs()
        console.log('imgs: ', imgs);
        values.avatar = imgs[0];

        const birthday = values['birthday'].format('YYYY-MM-DD');
        // console.log('birthday', birthday)
        values.birthday = birthday;
        values.phone = {
          phone: values.phone,
          prefix: values.prefix
        };
        this.props.updateInfo(_id, values)
        console.log('Received values of form: ', values);
        message.success('register firm success!')
        this.props.history.push('/home')
      }
    });
  };


  render() {

    const { current } = this.state;

    // dispatch to props
    const { } = this.props;

    // state to props
    const { } = this.props;
    // const listJS = list ? list.toJS() : [];

    const { getFieldDecorator } = this.props.form;

    let item = this.props.location.state;
    console.log('item', item)

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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: item.phone.prefix,
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const datePickerConfig = {
      rules: [{ type: 'object', required: true, message: 'Please select you birthday!' }],
    };

    // 左侧
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>个人资料</span>
        {/* <span>{isUpdate ? '修改员工信息' : '添加员工'}</span> */}
      </span>
    )

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} >
        <Card
          title={title}
          // title="个人资料"
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          {/* <Steps>
            <Step status="finish" title="负责人信息" icon={<Icon type="user" />} />
            <Step status="process" title="公司信息" icon={<Icon type="loading" />} />
            <Step status="wait" title="账号注册" icon={<Icon type="lock" />} />
            <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
          </Steps> */}
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item >
              {getFieldDecorator('_id', {
                initialValue: item._id,
              })(<Input disabled type='hidden' />)}
            </Form.Item>

            <Form.Item label="account">
              {getFieldDecorator('account', {
                initialValue: item.account,
                // rules: [{ required: true, message: 'Please input your realName!' }],
              })(<Input disabled />)}
            </Form.Item>

            <Form.Item label="nickname">
              {getFieldDecorator('nickname', {
                initialValue: item.nickname,
                rules: [{ required: true, message: 'Please input your nickname!' }],
              })(<Input />)}
            </Form.Item>

            {/* PicturesWall */}
            <Form.Item label='avatar'>
              {/* {console.log('picture', item.imgs)} */}
              <PicturesWall ref={this.pw} imgs={[item.avatar]}></PicturesWall>
              {/* {console.log('picture', item.imgs)}
              <PicturesWall ref={this.pw} imgs={item.imgs}></PicturesWall> */}
            </Form.Item>

            <Form.Item label="realName">
              {getFieldDecorator('realName', {
                initialValue: item.realName,
                rules: [{ required: true, message: 'Please input your realName!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="IDCard">
              {getFieldDecorator('IDCard', {
                initialValue: item.IDCard,
                rules: [{ required: true, message: 'Please input your IDCard!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label='gender:'>
              {getFieldDecorator('gender', {
                initialValue: item ? item.gender : 1,
                rules: [{ required: true, message: 'Please input your gender!' }],
              })(
                <Radio.Group onChange={this.onRadioChange}>
                  <Radio value={0}>女</Radio>
                  <Radio value={1}>男</Radio>
                </Radio.Group>)}
            </Form.Item>

            <Form.Item label='birthday:'>
              {getFieldDecorator('birthday', {
                initialValue: item ? moment(item.birthday) : null,
                rules: [{ required: true, message: 'Please input your birthday!' }],
              })(
                <DatePicker
                  // onChange={this.onDatePickerChange}
                  placeholder="birthday"
                  style={{ width: 410 }}
                />)}
            </Form.Item>


            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                initialValue: item.email,
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

            {/* <Form.Item label="describe">
              {getFieldDecorator('describe', {
                rules: [{ required: true, message: 'Please input your describe!' }],
              })(<Input.TextArea />)}
            </Form.Item> */}

            {/* <Form.Item label="address">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please input your address!' }],
              })(<Input.TextArea />)}
            </Form.Item> */}


            <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                initialValue: item.phone.phone,
                rules: [{ required: true, message: `Please input your company's phone number!` }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item {...buttonFormItemLayout}>
              <Button type="default" onClick={this.cancel} style={{ width: 100, margin: 10 }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: 100, margin: 10 }}>
                修改
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
  updateInfo(_id, data) {
    console.log('_id, data', _id, data)
    dispatch(loginActionCreators.updateInfoRequest(_id, data));
  }
})

const WrappedRegistrationForm = Form.create({ name: 'Personal' })(Personal);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))