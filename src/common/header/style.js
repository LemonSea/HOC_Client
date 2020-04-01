import styled from 'styled-components';
import logoPic from '../../static/logo.png';

// 头部组件
export const HeaderWrapper = styled.div`
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #202329;
  z-index: 9999;
`
export const Logo = styled.div`
  position: absolute;
  top: 0;
  left:  0;
  display: block;
  width: 300px;
  height: 55px;
  background: url(${logoPic});
  background-size: contain;
  margin-left: 50px;
`
export const Nav = styled.div`
  width: 760px;
  height: 100%;
  margin: 0 auto;
  background: #202329;
  box-sizing: border-box;
`
export const NavItem = styled.div`
  line-height: 56px;
  padding: 0 15px;
  font-size: 17px;
  color: #fff;
  &.left {
    float: left;
  }
  &.right {
    float: right;
  }
  &.active {
    color: #5DD4C7;
  }
`
export const NavSearch = styled.div`
  /* background-color: red */
`

export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 56px;
`

export const Button = styled.div`
  float: right;
  line-height: 38px;    
  border: 1px #5dd5c8 solid;
  border-radius: 19px;
  margin-top:9px;
  margin-right:30px;
  padding: 0 20px;
  color: #fff;
  text-align: center;
  min-width: 0;
  margin-left: 17px;
  &.login {
    margin-right: 80px;
  }
`