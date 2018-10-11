import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCall } from '../utils/create-call'
import { nextId } from '../transaction/transaction-factory'

export function withSend(WrappedComponent) {
  function mapDispatchToProps(dispatch, props) {
    return {
      dispatchSend: (transactionId, call, address, options) => {
        dispatch({ type: 'SEND_TRANSACTION', transactionId, call, address, options })
      }
    }
  }

  const SendWrapper = connect(() => { return {} }, mapDispatchToProps)(class _SendWrapper extends Component {
    send = (address, method, ...args) => {
      return (options) => {
        let call = createCall(address, method, ...args)
        let transactionId = nextId()
        this.props.dispatchSend(transactionId, call, address, options)
        return transactionId
      }
    }

    render () {
      return <WrappedComponent {...this.props} send={this.send} />
    }
  })

  return SendWrapper
}
