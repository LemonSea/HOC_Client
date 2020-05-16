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
      isCancel: false,
      isContinuePay: false,
      isComments: false,
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
      // {
      //   title: '预约开始时间',
      //   dataIndex: 'startTime',
      //   key: 'startTime',
      //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      // },
      // {
      //   title: '预约结束时间',
      //   dataIndex: 'endTime',
      //   key: 'endTime',
      //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      // },
      {
        title: '总预约时间',
        dataIndex: 'countTime',
        key: 'countTime',
        render: val => <span>{val + ` hours`}</span>,
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
          } else if (status === -2) {
            text = '待取消'
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
        dataIndex: 'placeTime',
        key: 'placeTime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
  }

  // 全行选中
  onRow = (item) => {
    return {
      onClick: event => {  // 点击行
        console.log(item.status)
        if (item.status === 0) {
          this.setState({
            isContinuePay: true,
            isComments: false,
            isCancel: true,
          })
        } else if (item.status === 2) {
          this.setState({
            isContinuePay: false,
            isComments: true,
            isCancel: false
          })
        } else if (item.status === 2) {
          this.setState({
            isContinuePay: false,
            isComments: false,
            isCancel: true
          })
        } else {
          console.log(this.state)
          this.setState({
            isContinuePay: false,
            isComments: false,
            isCancel: false
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

  /**
   * 取消订单
   */
  changeStatus = (_id, status) => {
    Modal.confirm({
      title: `确定取消该订单?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        const result = await reqChangeOrder(_id, status)
        console.log('result', result)
        if (result.status === 0) {
          message.success('取消订单成功!');
          // console.log(result)
          this.props.getList(1, this.props.currentUser.toJS())
        } else {
          message.warn('发生了错误!');
        }
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  }

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
    // console.log('currentUserJS', currentUserJS)

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
            onClick={() => {
              // this.props.history.push('/staffDetail', { item: item })
              this.props.history.push('/appointment-pay', { item: item })
            }
            }
          >
            继续支付
        </Button>
        </span>
        <span>
          <Button
            icon="edit"
            style={{ marginLeft: 20 }}
            type='primary'
            disabled={!this.state.isComments}
            // onClick={() => this.setState({ showStatus: 1 })}
            onClick={() => {
              // this.props.history.push('/staffDetail', { item: item })
              this.props.history.push('/appointment-finish', { item: item })
            }
            }
          >
            评论
        </Button>
        </span>
      </div>
    )

    // 右侧
    const extra = (
      <div>
        <Button
          style={{ marginLeft: 20 }}
          type='primary'
          disabled={!this.state.isCancel}
          // onClick={() => { this.delete(item._id, pageNum) }}
          onClick={() => this.changeStatus(item._id, -2)}
        >
          取消订单
    </Button>
        <Button
          style={{ marginLeft: 20 }}
          type='primary'
          disabled={!item._id}
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
              showQuickJumper: true, onChange: (pageNum) => { getList(pageNum, this.props.currentUser.toJS()) }
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
