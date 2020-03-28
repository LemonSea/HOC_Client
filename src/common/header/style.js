import styled from 'styled-components';
import logoPic from '../../static/logo.png';

// 头部组件
export const HeaderWrapper = styled.div`
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #202329;
`
export const Logo = styled.a`
  position: absolute;
  top: 0;
  left:  0;
  display: block;
  width: 300px;
  height: 56px;
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


// 搜索部分
export const SearchWrapper = styled.div`
    width: 100%;
    height: 100px;
`
export const SearchBox = styled.div`
  box-sizing: border-box;
  width: 936px;
  height: 80px;
  margin: 0 auto;
  padding-top: 20px;
  font-size: 13px;
`
export const SearchForm = styled.div`
  box-shadow: 0 0 6px 0 rgba(0,0,0,.13);
  height: 50px;
  &.focused {
    border: 1px solid #53cac3;
    border-color: #53cac3!important;
    transition: all linear .1s;
  }
  .slide-enter {
  opacity: 0;
}
.slide-enter-active {
  opacity: 1;
  transition: opacity 200ms;
  border: 1px solid #53cac3;
}
.slide-exit {
  opacity: 1;
}
.slide-exit-active {
  opacity: 0;
  transition: opacity 200ms;
}
`
export const PositionSel = styled.div`
  display: inline-block;  
  box-sizing: border-box;
  width: 130px;
    height: 50px;
    float: left;
    padding-top: 9px;
    padding-bottom: 11px;
    border-color: #fff;
    border-left: 1px solid #fff;
  font-size: 16px;
  display: block;
    border-right: none;
    line-height: 30px;
    padding: 10px 15px 8px 15px;
    background-color: #fff;
    position: relative;
    cursor: pointer;

    .iconfont {
      position: absolute;
      width: 16px;
    height: 16px;
    right: 8px;
    font-size: 1px;
    }
`
export const NavSearch = styled.input.attrs({
  placeholder: '搜索'
})`
float: left;
border: 0;
  box-sizing: border-box;
  width: 664px;
  height: 50px;
    line-height: 30px;
  padding: 10px 19px;
  background-color:#FFFFFF;
`
export const BtnSearch = styled.div`
  float: left;
  box-sizing: border-box;
  width: 140px;
  height: 50px;
  padding-left: 50px;
  line-height: 50px;
  background-image: none;
  font-size: 16px;
  background-color: #55CBC4;    
  color: #fff;
  display: inline-block;
  cursor: pointer;
`