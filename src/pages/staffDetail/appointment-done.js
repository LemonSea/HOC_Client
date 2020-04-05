import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Card,
  Icon,
  Select,
  Button,
  Steps,
  Result
} from 'antd';
import LinkButton from '../../components/link-button';

const { Option } = Select;
const { Step } = Steps;

class RegDone extends Component {

  render() {

    // dispatch to props
    const { } = this.props;

    // state to props
    const { } = this.props;
    // const listJS = list ? list.toJS() : [];



    return (
      <div style={{ background: '#ECECEC', padding: '30px' }} >
        <Card
          title="注册公司"
          bordered={true}
          style={{ maxWidth: 800, minHeight:600, margin: '0 auto' }}
          // hoverable={true}
          headStyle={{ fontSize: 20 }}
        >
          <Steps>                        
            <Step status="finish" title="核对订单" icon={<Icon type="solution" />} />
            {/* <Step status="process" title="Login" icon={<Icon type="solution" />} /> */}
            <Step status="finish" title="支付费用" icon={<Icon type="solution" />} />
            <Step status="process" title="完成订单" icon={<Icon type="loading" />} />
            <Step status="wait" title="评价" icon={<Icon type="smile-o" />} />
          </Steps>
          <Result
            status="success"
            title="订单支付成功！"
            subTitle="订单支付成功，我们将竭诚为您服务！"
            extra={[
              <Button type="primary" key="console" onClick={()=>{this.props.history.push('/home')}}>
                OK
              </Button>,
            ]}
          />
        </Card>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

// const WrappedRegistrationForm = Form.create({ name: 'register' })(RegFirm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RegDone))