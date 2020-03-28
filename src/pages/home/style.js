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
`
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