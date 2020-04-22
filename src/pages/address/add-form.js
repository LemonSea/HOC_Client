import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Cascader,
  Icon,
  Input,
  Select
} from 'antd';
import data from '../../utils/city.json';

const { Option } = Select;

class AddForm extends Component {

  componentDidMount() {
    this.props.setForm(this.props.form)
  }

  onChange = (value, selectedOptions) => {
    // console.log(selectedOptions)
  };

  filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  formItemLayout = {
    labelCol: { span: 4 },  // 左侧 label 宽度
    wrapperCol: { span: 18 }  // 右侧包裹的宽度
  }

  

  render() {
    
    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = this.props.form;
    // dispatch to props
    const { } = this.props;
    // state to props
    const { } = this.props;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    return (
      <Form {...this.formItemLayout}>
        <Form.Item label='用户名： '>
          {getFieldDecorator('name', {
            // initialValue: '',
            rules: [{ required: true, message: '用户名不能为空!' }]
          })(<Input placeholder="" />
          )}
        </Form.Item>

        <Form.Item label='所在地区： ' >
          {getFieldDecorator('area', {
            // initialValue: '',
            rules: [{ required: true, message: '所在地区不能为空!' }]
          })(
            // <Cascader placeholder='-请选择-' options={data} onChange={this.onChange} />
            <Cascader
              options={data}
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

        <Form.Item label="联系电话：">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '联系电话不能为空!' }],
          })(<Input addonBefore={prefixSelector} />)}
        </Form.Item>

      </Form>

    )
  }
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WrappedNormalForm = Form.create()(AddForm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalForm))