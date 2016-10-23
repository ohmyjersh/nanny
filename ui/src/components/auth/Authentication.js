import React, { Component } from 'react';  
import { connect } from 'react-redux';

export default function(ComposedComponent) {  
  class Authentication extends Component {
    constructor(props) {
      super(props);
    }
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(!this.props.state.auth.authenticated) {
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.state.auth.authenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { auth: state.module.auth };
  }

  return connect(mapStateToProps)(Authentication);
}