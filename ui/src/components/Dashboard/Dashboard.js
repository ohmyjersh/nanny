import React, { Component } from 'react'
import ConfigEditor from '../ConfigEditor/ConfigEditor'
import PreviewEditor from '../PreviewEditor/PreviewEditor'
import TransformerEditor from '../TransformerEditor/TransformerEditor'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='dashboard'>
        <div className='configEditor'>
          <ConfigEditor {...this.props} />
        </div>
        <div className='sideView'>
          <div className='previewEditor'>
            <PreviewEditor {...this.props} />
          </div>
          <div className='transformerEditor'>
            <TransformerEditor {...this.props} />
          </div>
        </div>
      </div>)
  }
}

export default Dashboard
