import React from 'react';
import PropTypes from 'prop-types';
import TestContext from 'views/context'

class ErrorBoundaries extends React.Component {
  static contextType = TestContext
  constructor(props){
      super(props)
      this.state = {
          err: false
      }
  }
  componentDidCatch(err, errorInfo){
      if (err){
          this.setState({
              err: true,
              errorInfo
          })
      }
  }
  render(){
      const { err, errorInfo } = this.state;
      const { children } = this.props;
      if (err){
          return errorInfo
      }
      return [children, this.context]
  }
}

ErrorBoundaries.propTypes = {
    children: PropTypes.node.isRequired
}

export default ErrorBoundaries;
