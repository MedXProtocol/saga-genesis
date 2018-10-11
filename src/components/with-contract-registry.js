import React, { Component } from 'react'
import PropTypes from 'prop-types'

export function withContractRegistry(WrappedComponent) {
  const ContractRegistryWrapper = class _ContractRegistryWrapper extends Component {
    static contextTypes = {
      contractRegistry: PropTypes.object
    }
    render () {
      return <WrappedComponent {...this.props} contractRegistry={this.context.contractRegistry} />
    }
  }

  return ContractRegistryWrapper
}
