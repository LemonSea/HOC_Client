import styled from 'styled-components'

export const HomeWrapper = styled.div`
  box-sizing: border-box;
  width: 1184px;
  margin: 0 auto;
  height: 600px;

  /* background-color: red; */
`
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
    z-index: 1002;
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
  height: 585px;

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

