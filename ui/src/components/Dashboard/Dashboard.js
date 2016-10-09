import React, { Component } from 'react'
import { Row, Col } from 'antd'
import ConfigEditor from '../ConfigEditor/ConfigEditor'
import PreviewEditor from '../PreviewEditor/PreviewEditor'
import TransformerEditor from '../TransformerEditor/TransformerEditor'

class Dashboard extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className='dashboard'>
        <div className='configEditor'>
          <ConfigEditor />
        </div>
        <div className='sideView'>
          <div className='previewEditor'>
            <PreviewEditor />
          </div>
          <div className='transformerEditor'>
            <TransformerEditor />
          </div>
        </div>
      </div>)
  }
}

export default Dashboard
