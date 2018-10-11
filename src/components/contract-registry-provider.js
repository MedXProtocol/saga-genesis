import React from 'react'
import PropTypes from 'prop-types'

export class ContractRegistryProvider extends React.Component {
  static propTypes = {
    contractRegistry: PropTypes.object.isRequired
  }

  static childContextTypes = {
    contractRegistry: PropTypes.object
  }

  getChildContext() {
    return {
      contractRegistry: this.props.contractRegistry
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}
