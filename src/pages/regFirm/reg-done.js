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
            <Step status="finish" title="负责人信息" icon={<Icon type="user" />} />
            {/* <Step status="process" title="Login" icon={<Icon type="loading" />} /> */}
            <Step status="finish" title="公司信息" icon={<Icon type="solution" />} />
            <Step status="process" title="账号注册" icon={<Icon type="lock" />} />
            <Step status="await" title="完成" icon={<Icon type="smile-o" />} />
          </Steps>
          <Result
            status="success"
            title="注册公司成功！"
            subTitle="注册公司成功，等待审核，审核完成后将已邮件通知！"
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