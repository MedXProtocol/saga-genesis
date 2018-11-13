import React, { Component } from 'react'
import PropTypes from 'prop-types'

export function withContractRegistry(WrappedComponent) {
  const ContractRegistryWrapper = class _ContractRegistryWrapper extends Component {
    render () {
      return <WrappedComponent {...this.props} contractRegistry={this.context.contractRegistry} />
    }
  }

  ContractRegistryWrapper.contextTypes = {
    contractRegistry: PropTypes.object
  }

  return ContractRegistryWrapper
}
