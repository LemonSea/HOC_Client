import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { BASE_IMG_URL } from '../../utils/constant';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  Addition,
  Button,
  AdditionUser,
  DropDown
} from './style';
import { Input, Select, Avatar, Modal } from 'antd';

const { Group, Search } = Input;
const { Option } = Select;

const Header = (props) => {

  const handleInputFocus = () => {
    console.log('handleInputFocus')
    props.dropDownFocus()
  }

  const handleInputBlur = () => {
    console.log('handleInputBlur')
    props.dropDownBlur()
  }

  const logout = () => {
    Modal.confirm({
      title: '确定退出吗?',
      onOk() {
        props.layoutDispatch()
        console.log(props)
        // props.history.replace('/')
        // props.history.push('/home')
      },
      // onCancel() {
      //     console.log('Cancel');
      // }
    })
  }

  // dispatch to props
  const { } = props;

  // state to props
  const { loginStatus, currentUser, focused } = props;
  const currentUserJS = currentUser ? currentUser.toJS() : [];
  // console.log('currentUserJS', currentUserJS)

  // 个人信息 link
  let personalPath = {
    pathname: '/personal',
    state: currentUserJS,
  }
  // 修改密码 link
  let accountValidatePath = {
    pathname: '/account-validate',
    state: currentUserJS._id,
  }

  return (
    <div style={{ zIndex: 9999 }}>
      <HeaderWrapper>
        <Link to="/"><Logo /></Link>
        <Nav>
          <Link to="/"><NavItem className='left'></NavItem></Link>
          <Link to="/"><NavItem className='left' >首页</NavItem></Link>
          <Link to="/staff" ><NavItem className='left' >服务人员</NavItem></Link>
          <Link to="/brand"><NavItem className='left'>服务公司</NavItem></Link>
          <Link to="/reg-officer"><NavItem className='right'>注册公司</NavItem></Link>
        </Nav>

        {
          loginStatus === false
            ? (<Addition>
              <Link to="/login"><Button className='login'>登录</Button></Link>
              <Link to="/register"><Button>注册</Button></Link>
            </Addition>)
            : (<AdditionUser
              onMouseEnter={handleInputFocus}
              onMouseLeave={handleInputBlur}
            >
              {/* <Link to="/login"><Button className='login'>登录</Button></Link>
              <Link to="/register"><Button>注册</Button></Link> */}
              <span className='name'>{currentUserJS.nickname}</span>
              <Avatar size="large" style={{ backgroundColor: '#fff', marginBottom: 10 }} src={BASE_IMG_URL + currentUserJS.avatar} />
              <DropDown
                className={focused ? 'focused' : 'blur'}
              >

                {/* <div onClick={() => { console.log('个人中心') }}>个人中心</div> */}
                <Link to={personalPath}><div>个人信息</div></Link>
                <Link to={accountValidatePath}><div>密码修改</div></Link>
                <Link to='/order-list'><div>地址簿</div></Link>
                <Link to='/order-list'><div onClick={() => { console.log('订单查看') }}>订单查看</div></Link>
                <div onClick={logout}>登出</div>
              </DropDown>
            </AdditionUser>)
        }

      </HeaderWrapper>
    </div >
  );
}

const mapStateToProps = (state) => ({
  loginStatus: state.getIn(['loginReducer', 'loginStatus']),
  currentUser: state.getIn(['loginReducer', 'currentUser']),

  focused: state.getIn(['header', 'focused']),

})
const mapDispatchToProps = (dispatch) => ({
  dropDownFocus() {
    dispatch(actionCreators.dropDownFocus());
  },
  dropDownBlur() {
    dispatch(actionCreators.dropDownBlur());
  },
  layoutDispatch() {
    dispatch(loginActionCreators.postLayoutRequest());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);