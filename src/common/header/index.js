import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { actionCreators } from './store';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  Addition,
  Button
} from './style';
import { Input, Select } from 'antd';

const { Group, Search } = Input;
const { Option } = Select;

const Header = (props) => {

  const selectChange = (value) => {
    console.log(`selected ${value}`);
  }
  const searchChange = (value) => {
    console.log(`search ${value}`);
  }

  return (
    <div style={{ zIndex: 9999 }}>
      <HeaderWrapper>
        <Link to="/"><Logo /></Link>
        <Nav>
          <Link to="/"><NavItem className='left'></NavItem></Link>
          <Link to="/"><NavItem className='left'>首页</NavItem></Link>
          <Link to="/staff"><NavItem className='left'>服务人员</NavItem></Link>
          <Link to="/brand"><NavItem className='left'>服务公司</NavItem></Link>
          <Link to="/reg-officer"><NavItem className='right'>注册公司</NavItem></Link>
        </Nav>

        <Addition>
          <Link to="/login"><Button className='login'>登录</Button></Link>
          <Link to="/register"><Button>注册</Button></Link>
        </Addition>
      </HeaderWrapper>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);