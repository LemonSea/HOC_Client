import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { List, Typography, DatePicker } from 'antd';

import { connect } from 'react-redux';
import * as actionCreators from '../store/actionCreators';
import { TypeItem } from '../style';
import { PAGE_SIZE } from '../../../utils/constant';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


class BrandList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typeItem: '',
      currentIndex: ''
    }
  }

  onPickerChange = (date, dateString) => {
    console.log(date, dateString);
  }

  onClickType = (typeItem, index) => {
    this.setState({
      typeItem,
      currentIndex: index
    }, () => {
      this.props.changeStaffType(1, PAGE_SIZE, typeItem)
      console.log(this.props.typeItem)
    })
  }

  render() {
    const { staffType } = this.props;

    return (
      <div>
        <List
          bordered
        >
          <List.Item>
            <Typography.Title level={4}>类别：</Typography.Title>
            {staffType.map((item, index) => {
              return (
                <TypeItem
                  onClick={() => { this.onClickType(item._id, index) }}
                  key={item.name}
                >
                  {/* <Typography.Text></Typography.Text> */}
                  <span
                    // className="action"
                    // className={index === this.state.currentIndex ? "active" : null}
                    // className={`ant-typography ${item.name === typeItem ? "active" : null}`}
                    style={{
                      marginLeft: 20, cursor: 'pointer',
                      color: (item._id === this.props.typeItem) ? " #5DD5C8" : "#000"
                    }}
                  >{item.name}</span>
                </TypeItem>
              )
            })}
          </List.Item>
          {/* <List.Item>
            <Typography.Title level={4}>时间：</Typography.Title>
            <RangePicker onChange={this.onPickerChange} />
          </List.Item> */}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  typeItem: state.getIn(['staffReducer', 'typeItem']),
  pageNum: state.getIn(['staffReducer', 'pageNum']),
})

const mapDispatchToProps = (dispatch) => ({
  changeStaffType(pageNum, pageSize, typeItem) {
    dispatch(actionCreators.changeStaffType(pageNum, pageSize, typeItem));
  },
  searchList(pageNum, typeItem) {
    dispatch(actionCreators.searchList(pageNum, PAGE_SIZE, typeItem))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BrandList)