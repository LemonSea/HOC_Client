import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  SearchWrapper,
  NavSearch,
  SearchInput,
  SearchBox,
  SearchForm,
  PositionSel,
  BtnSearch
} from '../style';

export default class SearchPart extends Component {
  render() {
    return (
      <SearchWrapper >
        <SearchBox>
          <CSSTransition
            // in={props.focused}
            timeout={200}
            classNames="show"
          >
            <SearchForm
              // className={props.focused ? 'focused' : ''}
              // onMouseEnter={props.handleInputFocus}
              // onMouseLeave={props.handleInputBlur}
            >
              <PositionSel>
                服务类型
            <span className="iconfont">&#xe630;</span>
              </PositionSel>
              <SearchInput
              ></SearchInput>
              <BtnSearch>搜索</BtnSearch>
            </SearchForm>
          </CSSTransition>
        </SearchBox>
      </SearchWrapper>
    )
  }
}