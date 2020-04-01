import React, { Component } from 'react';

class Staff extends Component {
  render() {
    // console.log(this.props.match.params)
    console.log(this.props.location.state)
    console.log(this.props.location)
    return (
      <div>Staff</div>
    )
  }
}

export default Staff;