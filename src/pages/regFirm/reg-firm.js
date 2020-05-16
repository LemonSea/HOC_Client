import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from 'moment';
import city from '../../utils/city.json';

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
import PicturesWall from './pictures-wall';

const { Option } = Select;
const { Step } = Steps;

class RegFirm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
    this.pw = React.createRef();
  }

  previous = () => {
    this.props.history.push('/reg-officer')
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const imgs = this.pw.current.getImgs()
        console.log('imgs: ', imgs);
        values.imgs = imgs;
        values.areaStr = values.area.join('');
        values.phone1 = {
          phone1: values.phone1,
          prefix1: values.prefix1
        };
        values.phone2 = {
          phone2: values.phone2,
          prefix2: values.prefix2
        };
        values.phone3 = {
          phone3: values.phone3,
          prefix3: values.prefix3
        };
        this.props.getFirm(values)
        console.log('Received values of form: ', values);
        message.success('register firm success!')
        this.props.history.push('/reg-account')
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

    const prefixSelector1 = getFieldDecorator('prefix1', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    const prefixSelector2 = getFieldDecorator('prefix2', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    const prefixSelector3 = getFieldDecorator('prefix3', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

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
            {/* <Step status="process" title="Login" icon={<Icon type="loading" />} /> */}
            <Step status="process" title="公司信息" icon={<Icon type="loading" />} />
            <Step status="wait" title="账号注册" icon={<Icon type="lock" />} />
            <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
          </Steps>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="name">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your realName!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="describe">
              {getFieldDecorator('describe', {
                rules: [{ required: true, message: 'Please input your describe!' }],
              })(<Input.TextArea />)}
            </Form.Item>

            {/* <Form.Item label="address">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please input your address!' }],
              })(<Input.TextArea />)}
            </Form.Item> */}

            <Form.Item label='所在地区： ' >
              {getFieldDecorator('area', {
                // initialValue: '',
                rules: [{ required: true, message: '所在地区不能为空!' }]
              })(
                <Cascader
                  options={city}
                  onChange={this.onChange}
                  placeholder="-请选择-"
                  showSearch={this.filter}
                />
              )}
            </Form.Item>

            <Form.Item label='详细地址： ' >
              {getFieldDecorator('detailAddress', {
                // initialValue: '',
                rules: [{ required: true, message: '详细地址不能为空!' }]
              })(
                <Input placeholder="" />
              )}
            </Form.Item>

            {/* PicturesWall */}
            <Form.Item label='公司照片'>
              {/* {console.log('picture', item.imgs)} */}
              <PicturesWall ref={this.pw}></PicturesWall>
              {/* {console.log('picture', item.imgs)}
              <PicturesWall ref={this.pw} imgs={item.imgs}></PicturesWall> */}
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

            <Form.Item label="Phone Number">
              {getFieldDecorator('phone1', {
                rules: [{ required: true, message: `Please input your company's phone number!` }],
              })(<Input addonBefore={prefixSelector1} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item label="Phone Number">
              {getFieldDecorator('phone2', {
                // rules: [{ required: true, message: `Please input your company's phone number!` }],
              })(<Input addonBefore={prefixSelector2} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item label="Phone Number">
              {getFieldDecorator('phone3', {
                // rules: [{ required: true, message: `Please input your company's phone number!` }],
              })(<Input addonBefore={prefixSelector3} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item {...buttonFormItemLayout}>
              <Button type="default" onClick={this.previous} style={{ width: 100, margin: 10 }}>
                Previous
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: 100, margin: 10 }}>
                Next
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
  getFirm(data) {
    dispatch(actionCreators.getFirm(data));
  }
})

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegFirm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedRegistrationForm))