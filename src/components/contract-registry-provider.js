import React from 'react'
import PropTypes from 'prop-types'

export class ContractRegistryProvider extends React.Component {
  getChildContext() {
    return {
      contractRegistry: this.props.contractRegistry
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

ContractRegistryProvider.propTypes = {
  contractRegistry: PropTypes.object.isRequired
}

ContractRegistryProvider.childContextTypes = {
  contractRegistry: PropTypes.object
}
