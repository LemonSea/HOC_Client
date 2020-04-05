import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon,
  Select
} from 'antd';


const { Item } = Form;
const { Option } = Select;

class AppointmentForm extends Component {

  componentDidMount() {
    this.props.setForm(this.props.form)
  }

  render() {

    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = this.props.form;
    // dispatch to props
    const { } = this.props;

    const { item,currentUser } = this.props;

    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧 label 宽度
      wrapperCol: { span: 18 }  // 右侧包裹的宽度
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <Form {...formItemLayout}>
        <Item label='预约人：' >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your realName!' }],
            initialValue: currentUser.nickname,
          })(<Input disabled />)}
        </Item>
        <Item label="电话号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: `Please input your company's phone number!` }],
            initialValue: currentUser.phone.phone + currentUser.phone.prefix,
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Item>
        <Item label='地址：' >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your realName!' }],
            initialValue: currentUser.address,
          })(<Input />)}
        </Item>
        <Item label='备注：' >
          {getFieldDecorator('describe', {
            // rules: [{ required: true, message: 'Please input your describe!' }],
          })(<Input.TextArea />)}
        </Item>
      </Form>
    )
  }
}


// const mapStateToProps = (state) => ({
// })

// const mapDispatchToProps = (dispatch) => ({

// })

export default Form.create()(AppointmentForm);
// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalForm))