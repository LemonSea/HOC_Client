import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { List, Typography,DatePicker } from 'antd';
import data from '../../../utils/city.json'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class BrandList extends Component {

  onPickerChange = (date, dateString) => {
    console.log(date, dateString);
  }

  render() {
    const { staffType } = this.props;
    const place = ['北京', '上海', '广州', '深圳', '天津', '重庆', '云南', '杭州', '西安', '贵州']
    return (
      <div>
        <List
          bordered
        >
          <List.Item>
            <Typography.Title level={4}>地址：</Typography.Title>
            {data.map((item, index) => {
              return (
                <Typography.Text style={{marginLeft:20, cursor:'pointer'}}>{item.name}</Typography.Text>
              )
            })}
          </List.Item>
          <List.Item>
            <Typography.Title level={4}>时间：</Typography.Title>
            <RangePicker onChange={this.onPickerChange} />
          </List.Item>
        </List>
      </div>
    )
  }
}