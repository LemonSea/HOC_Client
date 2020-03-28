import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  Addition,
  Button,

  SearchWrapper,
  NavSearch,
  SearchBox,
  SearchForm,
  PositionSel,
  BtnSearch
} from './style';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    }
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  render() {
    return (
      <div>
        <HeaderWrapper>
          <Logo href='/' />
          <Nav>
            <NavItem className='left'></NavItem>
            <NavItem className='left'>首页</NavItem>
            <NavItem className='left'>服务人员</NavItem>
            <NavItem className='left'>服务公司</NavItem>
            <NavItem className='right'>我要开公司</NavItem>
          </Nav>
          <Addition>
            <Button className='login'>登录</Button>
            <Button>注册</Button>
          </Addition>
        </HeaderWrapper>
        <SearchWrapper >
          <SearchBox>
            <CSSTransition
              in={this.state.focused}
              timeout={200}
              classNames="slide"
            >
            <SearchForm
              className={this.state.focused ? 'focused' : ''}
              onFocus={this.handleInputFocus}
              onBlur={this.handleInputBlur}
            >
              <PositionSel>
                服务类型
              <span className="iconfont">&#xe630;</span>
              </PositionSel>
              <NavSearch
              ></NavSearch>
              <BtnSearch>搜索</BtnSearch>
            </SearchForm>
            </CSSTransition>
          </SearchBox>
        </SearchWrapper>
      </div>
    );
  }

  handleInputFocus() {
    this.setState({
      focused: true
    })
  }
  handleInputBlur() {
    this.setState({
      focused: true
    })
  }
}

export default Header;