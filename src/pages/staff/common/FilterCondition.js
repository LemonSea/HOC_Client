import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { List, Typography,DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;



const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default class BrandList extends Component {

  onPickerChange = (date, dateString) => {
    console.log(date, dateString);
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