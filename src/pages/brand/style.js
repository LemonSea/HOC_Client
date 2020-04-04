import styled from 'styled-components'

export const HomeWrapper = styled.div`
  box-sizing: border-box;
  width: 1184px;
  margin: 0 auto;
  height: 600px;
  padding-top: 10;

  /* background-color: red; */
`

/**
 * 搜索部分
 */
export const SearchWrapper = styled.div`
    width: 100%;
    height: 100px;
  background-color: #FFFFFF;
  z-index:9999;
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
  /* &.focused {
    border: 1px solid #53cac3;
    border-color: #53cac3!important;
  } */
  &.show-enter {
    border: 1px solid #fff;
    transition: all .2s ease-out;
  }
  &.show-enter-active {
    border: 1px solid #53cac3;
  }
  &.show-enter-done {
    border: 1px solid #53cac3;
  }
  &.show-exit {
    border: 1px solid #53cac3;
  }
  &.show-exit-active {
    transition: all .2s ease-out;
    border: 1px solid #fff;
  }
  &.show-exit-done {
    transition: all .1s ease-out;
    border: 1px solid #fff;
  }
`
export const PositionSel = styled.div`
  border: none;
  outline: none;
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

export const SearchInput = styled.input.attrs({
  placeholder: '搜索'
})`
  box-sizing: border-box;
  float: left;
  border: none;
  outline: none;
  width: 664px;
  height: 50px;
  line-height: 30px;
  padding: 10px 19px;
  background-color:#FFFFFF;
`
export const BtnSearch = styled.div`
  box-sizing: border-box;
  border: none;
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

/**
 * 广告部分
 */
export const HomeAdvertise = styled.div`
  box-sizing: border-box;
  width: 1184px;
  margin: 0 auto;
  overflow: hidden;

  /* background-color: Green; */
`

/**
 * SliderBox
 */
export const HomeMain = styled.div`
  box-sizing: border-box;
  float: right;
  min-width: 697px;
  max-width: 784px;
  height: 340px;
  display: inline-block;
  /* background-color: yellow; */
`
export const SlideBox = styled.div`
  box-sizing: border-box;
  position: relative;
  /* border: 1px solid ; */
  /* overflow: hidden; */
  &.sl-1{
  float: left;
    width:522px;
    height:226px;
  }
  &.sl-2{
  float: left;
    width:260px;
    height:112px;
  }
  &.sl-3{
  float: left;
    width:260px;
    height:112px;
  }
  &.sl-4{
  float: left;
    width:522px;
    height:112px;
  }
  &.sl-5{
  float: left;
    width:260px;
    height:112px;
  }
`

/**
 * JobMenu
 */
export const HomeSide = styled.div`
  box-sizing: border-box;
  float: left;
  width: 384px;
  height: 340px;
  display: inline-block;
  background-color: Blue;

  background: #fff;
    color: #61687c;
    position: relative;
    /* z-index: 1002; */
    box-shadow: 5px 5px 15px rgba(3,0,0,.04);
    padding-top: 0;
    border:2px solid #55CBC4;
    border-top: none;
    border-left: none;
    border-right: none;
`

export const MenuLine = styled.div`
  box-sizing: border-box;
    padding: 12px 60px 9px;
    /* height: 44px; */
    line-height: 26px;
    font-weight: 600;
    color: #414a60;
    font-size: 15px;
    overflow:hidden;
    border:2px solid #55CBC4;
    border-bottom: none;
  .iconfont {
    float:right;
  }
  .p {
    color: #61687c;
    font-size: 13px;
    display: inline-block;
    line-height: 28px;
    margin-left: 16px;
  }
  /* background-color: yellow; */
`


export const CommonBox = styled.div`
    clear: both;
    margin-top: 37px;
    overflow: hidden;
  width: 100%;
  text-align:center;
  /* height: 585px; */
  .staff-img {
    width: 100px;
    height: 100px;
    border: 1px solid #002140;
    margin-bottom: 14px;
  }
  .title {
    line-height: 22px;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 14px;
  }
  /* background-color: yellow; */
`
export const BoxTitle = styled.div`
    font-size: 24px;
    text-align: center;
    position: relative;
    margin-bottom: 24px;
    .title{
      content: '';
    display: inline-block;
    vertical-align: 8px;
    margin: 0 10px;
    /* width: 50px; */
    height: 1px;
    }
    
  /* background-color: blue; */
`

