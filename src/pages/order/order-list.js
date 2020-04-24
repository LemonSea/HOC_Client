import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { reqChangeOrder } from './api';
import moment from 'moment';

import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  Modal,
  message
} from 'antd';
import LinkButton from '../../components/link-button/index';
import { PAGE_SIZE } from '../../utils/constant';
import {
  HomeWrapper,
  HomeAdvertise,
  HomeSide
} from './style';
// import AuthForm from './auth-form';
// import EditForm from './edit-form';


const Option = Select.Option;

class order extends PureComponent {

  constructor(props) {
    super(props)
    this.auth = React.createRef()

    this.state = {
      item: {},  // 当前选中项
      isShowAdd: false,  // 是否显示添加界面
      isShowAuth: false,  // 是否显示设置权限界面
      isContinuePay: false,
      showStatus: 0
    }
  }

  // table 标题
  initColumns = () => {
    this.columns = [
      {
        title: '消费者',
        dataIndex: 'user[nickname]',
        key: 'user[nickname]',
      },
      {
        title: '服务人员',
        dataIndex: 'employee[name]',
        key: 'employee[name]',
      },
      {
        title: '对应公司',
        dataIndex: 'company[name]',
        key: 'company[name]',
      },
      {
        title: '预约开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '预约结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '总预约时间',
        dataIndex: 'countTime[countHours]',
        key: 'countTime[countHours]',
      },
      {
        title: '订单状态',
        // dataIndex: 'status',
        // key: 'status',
        render: (item) => {
          let text
          const { status, _id } = item;
          if (status === 0) {
            text = '待支付'
          } else if (status === 1) {
            text = '已支付，待完成'
          } else if (status === 2) {
            text = '已完成，待评论'
          } else if (status === 3) {
            text = '完成'
          } else {
            text = '已取消'
          }
          return (
            <span>
              <span>
                {text}
              </span>
            </span>
          )
        }
      },
      {
        title: '下单时间',
        dataIndex: 'firstTime',
        key: 'firstTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
  }

  // 全行选中
  onRow = (item) => {
    return {
      onClick: event => {  // 点击行
        if(item.status === 0) {
          this.setState({
            isContinuePay: true
          })
        } else {
          this.setState({
            isContinuePay: false
          })
        }
        this.setState({
          item
        })
        // console.log(item)
      }
    }
  }

  handleCancel = e => {
    // console.log(e);
    this.setState({
      showStatus: 0
    });
    this.form.resetFields();
  };


  componentWillMount() {
    // list 标题
    this.initColumns()
  }

  componentDidMount() {
    // console.log('staffStatus')
    this.props.getList(1, this.props.currentUser.toJS())
    // this.props.getRoleList()
  }

  render() {
    // dispatch to props
    const { getList } = this.props;

    // state to props
    const { list, loading, total, roles, pageNum, currentUser } = this.props;
    const listJS = list ? list.toJS() : [];
    const currentUserJS = currentUser ? currentUser.toJS() : [];
    console.log('currentUserJS', currentUserJS)

    const { item, showStatus } = this.state

    const dataSource = listJS;

    // 左侧
    const title = (
      <div>
        <span>
          <Button
            icon="edit"
            type='primary'
            disabled={!this.state.isContinuePay}
            // onClick={() => this.setState({ showStatus: 1 })}
            onClick={()=>{
              // this.props.history.push('/staffDetail', { item: item })
              this.props.history.push('/appointment-pay', { item: item })}
            }
          >
            继续支付
        </Button>
        </span>
        {/* <span>
          <Button
            disabled={!item._id}
            style={{ marginLeft: 30 }}
            type={item.status === 0 ? 'primary' : 'danger'}
            onClick={() => this.changeStatus(item._id, item.status === 0 ? 1 : 0, this.props.pageNum)}
          >
            {item.status === 0 ? '启用该账号' : '冻结该账号'}</Button>
        </span> */}
      </div>
    )

    // 右侧
    const extra = (
      // <Button
      //   type='primary'
      //   disabled={!item._id}
      //   onClick={() => { this.delete(item._id, pageNum) }}
      // >
      //   删除
      // </Button>
      <div>
        {/* <Button
      type='default'
      disabled={!item._id}
      // onClick={() => { this.delete(item._id, pageNum) }}
      onClick={() => this.props.history.push('/company/officerDetail', { item: item.Officer })}
    >
      查看公司负责人详情
    </Button> */}

        <Button
          style={{ marginLeft: 20 }}
          type='primary'
          disabled={!item._id}
          // onClick={() => { this.delete(item._id, pageNum) }}
          onClick={() => this.props.history.push('/order-detail', { item: item })}
        >
          查看订单详情
    </Button>

      </div>
    )

    return (
      
      <HomeWrapper>
      <Card title={title} extra={extra}>
        {/* <Card title={title}> */}
        <Table
          bordered={true}
          rowKey='_id'
          loading={loading}
          dataSource={dataSource}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true, onChange: (pageNum) => { getList(pageNum,  this.props.currentUser.toJS()) }
          }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [item._id],
            onSelect: (item) => {
              this.setState({
                item
              })
            }
          }}
          onRow={this.onRow}
        ></Table>

        {/* <Modal
          title="查看权限"
          visible={showStatus === 2}
          onOk={() => {
            this.setState({ showStatus: 0 })
            // this.updateRole(creatorJS, this.form);
            // getList()
          }}
          onCancel={() => {
            this.setState({ showStatus: 0 })
            // this.form.resetFields();
          }}
        >
          <AuthForm
            item={item.role}
            list={this.props.menuList}
            // ref={this.auth}
          // setForm={(form) => { this.form = form }}
          />
        </Modal> */}

        {/* <Modal
          title="管理角色"
          visible={showStatus === 1}
          onOk={() => {
            this.changeRole(this.props.pageNum)
          }}
          onCancel={this.handleCancel}
        >
          <EditForm
            item={item}
            roles={rolesJS}
            setForm={(form) => { this.form = form }}
          />
        </Modal> */}

      </Card>
      
      </HomeWrapper>
    )
  }
}


const mapStateToProps = (state) => ({
  currentUser: state.getIn(['loginReducer', 'currentUser']),
  list: state.getIn(['orderReducer', 'list']),
  total: state.getIn(['orderReducer', 'total']),
  pageNum: state.getIn(['orderReducer', 'pageNum']),
})

const mapDispatchToProps = (dispatch) => ({
  getList(pageNum, user) {
    console.log(user)
    let _id = user._id;
    dispatch(actionCreators.reqList(pageNum, PAGE_SIZE, _id));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(order))