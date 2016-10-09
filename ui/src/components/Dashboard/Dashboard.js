import React, { Component } from 'react'
import { Row, Col } from 'antd'
import ConfigEditor from '../ConfigEditor/ConfigEditor';
import PreviewEditor from '../PreviewEditor/PreviewEditor';
import TransformerEditor from '../TransformerEditor/TransformerEditor';

class Dashboard extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div>
        <Row type="flex" justify="center" align="top">
          <Col span={30}><ConfigEditor />
          </Col>
          <Col span={50}>
            <Row><PreviewEditor /> </Row>
            <Row><TransformerEditor /></Row>
          </Col>
        </Row>
      </div>)
  }
}

export default Dashboard
