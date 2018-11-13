import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BN from 'bn.js'
import {
  addLogListener,
  removeLogListener
} from '../actions'

function mapDispatchToProps(dispatch) {
  return {
    dispatchAddLogListener: (address, fromBlock) => {
      dispatch(addLogListener(address, fromBlock))
    },

    dispatchRemoveLogListener: (address) => {
      dispatch(removeLogListener(address))
    }
  }
}

function isDefined(variable) {
  return variable !== null && typeof variable !== 'undefined'
}

export const LogListener = connect(() => { return {} }, mapDispatchToProps)(class _LogListener extends Component {
  componentDidMount () {
    if (this.props.address && isDefined(this.props.fromBlock)) {
      this.props.dispatchAddLogListener(this.props.address, this.props.fromBlock)
    }
  }

  componentWillReceiveProps (props) {
    const oldPropsAreFullyDefined = this.props.address && isDefined(this.props.fromBlock)
    const addressHasChanged = this.props.address !== props.address
    let removedOldProps = false
    if (oldPropsAreFullyDefined && addressHasChanged) {
      this.props.dispatchRemoveLogListener()
      removedOldProps = true
    }
    const newPropsAreFullyDefined = props.address && isDefined(props.fromBlock)
    if ((!oldPropsAreFullyDefined || removedOldProps) && newPropsAreFullyDefined) {
      this.props.dispatchAddLogListener(props.address, props.fromBlock)
    }
  }

  componentWillUnmount() {
    this.props.dispatchRemoveLogListener(this.props.address)
  }

  render () {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
})

LogListener.propTypes = {
  address: PropTypes.string,
  fromBlock: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(BN)
  ])  
}
