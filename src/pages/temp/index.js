import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Button,
} from 'antd';
import LinkButton from '../../components/link-button';

class Temp extends Component {

  render() {
    // dispatch to props
    const { } = this.props;

    // state to props
    const { } = this.props;
    // const listJS = list ? list.toJS() : [];


    return (
      <div>Temp</div>
    )
  }
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Temp))