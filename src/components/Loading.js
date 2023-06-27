import React, { Component } from 'react'

export class Loading extends Component {
  render() {
    return (
      <div className='w-full flex justify-center mt-[250px]'>
        <img src="loading.gif" alt="" />
      </div>
    )
  }
}

export default Loading
