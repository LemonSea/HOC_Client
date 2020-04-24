import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Cascader,
  Select
} from 'antd';
import data from '../../utils/city.json';


const { Item } = Form;
const { Option } = Select;

class AppointmentForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addressId: '',
      addressArea: [],
      detailAddress: ''
    }
  }

  filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  }

  componentDidMount() {
    this.props.setForm(this.props.form)

    this.props.addressList.forEach(element => {
      console.log(element.isDefault)
      if(element.isDefault) { 
        this.setState({
          addressId: element._id,
          addressArea: element.area,
          detailAddress: element.detailAddress
        })
      }
    });
  }

  render() {

    // props.form
    const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = this.props.form;
    // dispatch to props
    const { } = this.props;

    const { item,currentUser,addressList } = this.props;
    console.log(this.state)

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

        <Item label='选择服务地址'>
            {getFieldDecorator('serviceAddress', {
              initialValue: this.state.addressId,
              // initialValue: item ? item.staffStatus._id : "请输入员工类型",
              rules: [{ required: true, message: '必须输入地址!' }],
            })(
              <Select style={{ width: 410 }} onChange={this.handleSelectChange}>
                {addressList.map((item, index) => {
                  return (
                    < Option key={item._id} value={item._id}>{item.areaStr + item.detailAddress}</Option>
                  )
                })}
              </Select>)}
          </Item>

        {/* <Form.Item label='所在地区： ' >
          {getFieldDecorator('area', {
            initialValue: this.state.addressArea,
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
            initialValue: this.state.detailAddress,
            rules: [{ required: true, message: '详细地址不能为空!' }]
          })(
            <Input placeholder="" />
          )}
        </Form.Item> */}

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