import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { reqAddUserAddress, reqEditUserAddress,reqDeleteUserAddress, reqSetDefault } from './api'

import {
  Card,
  Modal,
  Skeleton,
  Button,
  Icon,
  List,
  message
} from 'antd';
import { TitleSpan } from './style';
import LinkButton from '../../components/link-button';

import AddForm from './add-form';
import EditForm from './edit-form';
import BrandList from '../brand/common/BrandList';

class Temp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: 0,
      item: {}
    }
  }

  showAddress() {
    this.setState({
      isShow: 1
    })
  }
  showEdit(item) {
    this.setState({
      isShow: 2,
      item
    })
  }

  handleCancel(form) {
    form.resetFields()
    this.setState({
      isShow: 0
    })
  }

  // 新增地址
  addAddress() {
    this.form.validateFields(async (err, value) => {
      if (!err) {
        const user = this.props.currentUser.toJS()._id
        const formDate = {
          name: value.name,
          area: value.area,
          areaStr: value.area.join(''),
          detailAddress: value.detailAddress,
          phone: {
            phone: value.phone,
            prefix: value.prefix
          },
          creator: user
        }
        const result = await reqAddUserAddress(formDate)
        if (result.status === 0) {
          message.success('添加地址成功!');
          this.props.getList(user)
          this.setState({ isShow: 0 });
          this.form.resetFields();
        } else {
          message.warn('添加地址失败!');
        }
      }
    })
  }

  // 修改地址
  editAddress() {
    this.form.validateFields(async (err, value) => {
      if (!err) {
        const user = this.props.currentUser.toJS()._id
        const formDate = {
          name: value.name,
          area: value.area,
          areaStr: value.area.join(''),
          detailAddress: value.detailAddress,
          phone: {
            phone: value.phone,
            prefix: value.prefix
          },
          creator: user
        }
        const _id = value._id;
        const result = await reqEditUserAddress(_id, formDate)
        if (result.status === 0) {
          message.success('修改地址成功!');
          this.props.getList(user)
          this.setState({ isShow: 0 });
          this.form.resetFields();
        } else {
          message.warn('修改地址失败!');
        }
      }
    })
  }

  deleteAddress = (_id) => {
    Modal.confirm({
      title: `确定删除吗?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        const user = this.props.currentUser.toJS()._id
        const result = await reqDeleteUserAddress(_id)
        if (result.status === 0) {
          message.success('删除地址成功!');
          this.props.getList(user)
        } else {
          message.warn('删除地址失败!');
        }
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  }

  // 设置默认地址
  setDefault = async (newId) => {
    const user = this.props.currentUser.toJS()._id;
    let oldId;
    this.props.addressList.toJS().forEach(element => {
      if (element.isDefault) {
        oldId = element._id;
      }
    });
    const result = await reqSetDefault(oldId, newId);
    if (result.status === 0) {
      message.success('设置默认地址成功!');
      this.props.getList(user);
    } else {
      message.warn('设置默认地址失败!');
    }
  }

  // deleteRole = async () => {
  //   const item = this.state.item;
  //   const result = await reqDeleteRole(item._id)
  //   if (result.status === 0) {
  //     message.success('删除角色成功!');
  //     this.props.getList()
  //   } else {
  //     message.warn('删除角色失败!');
  //   }
  // };

  componentDidMount() {
    const user = this.props.currentUser.toJS()._id;
    this.props.getList(user)
  }

  render() {
    // dispatch to props
    const { } = this.props;

    // state to props
    const { addressList } = this.props;
    const addressListJS = addressList ? addressList.toJS() : [];

    const { isShow } = this.state


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

    // 左侧
    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{ fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>地址簿</span>
        {/* <span>{isUpdate ? '修改员工信息' : '添加员工'}</span> */}
      </span>
    )

    // 右侧
    const extra = (
      <Button type='primary' onClick={() => this.showAddress()}>
        <Icon type='plus' />
        添加新地址
      </Button>
    )

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} >
        <Card
          title={title}
          extra={extra}
          bordered={true}
          style={{ maxWidth: 800, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          <List
            size="large"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={addressListJS}
            renderItem={item => (
              <Skeleton loading={false}>
                <List.Item
                  key={item._id}
                  actions={[
                    <a onClick={() => this.showEdit(item)}>修改</a>,
                    <a onClick={() => this.deleteAddress(item._id)}>删除</a>
                    // <a onClick={() => this.setDefault(item._id)} style={{ display: item.isDefault ? 'none' : '' }}>设为默认</a>
                  ]}
                >
                  <TitleSpan>姓名：{item.name}</TitleSpan>
                  <TitleSpan style={{ display: item.isDefault ? '' : 'none', color: 'red' }}>&emsp;&emsp; 默认地址</TitleSpan>&emsp;&emsp;
                  <Button type='default' onClick={() => this.setDefault(item._id)} style={{ display: item.isDefault ? 'none' : '' }}>设为默认地址</Button>
                  <br />
                  <br />
                所在地区：{item.area}
                &emsp; |&emsp;
                详细地址：{item.detailAddress}
                  <br />
                  <br />
                电话：{item.phone.prefix + '+' + item.phone.phone}
                </List.Item>
              </Skeleton>
            )}
          />

          <Modal
            title="添加新地址"
            visible={isShow === 1}
            onOk={() => {
              this.addAddress();
            }}
            onCancel={() => { this.handleCancel(this.form) }}
          >
            <AddForm
              setForm={(form) => { this.form = form }}
            />
          </Modal>

          <Modal
            title="修改地址信息"
            visible={isShow === 2}
            onOk={() => {
              this.editAddress();
            }}
            onCancel={() => { this.handleCancel(this.form) }}
          >
            <EditForm
              item={this.state.item}
              setForm={(form) => { this.form = form }}
            />
          </Modal>

        </Card>

      </div >
    )
  }
}


const mapStateToProps = (state) => ({
  currentUser: state.getIn(['loginReducer', 'currentUser']),
  addressList: state.getIn(['addressReducer', 'list'])
})

const mapDispatchToProps = (dispatch) => ({
  getList(user) {
    dispatch(actionCreators.getList(user));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Temp))