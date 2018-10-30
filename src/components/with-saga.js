import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

let lastSagaKey = 0

const debug = require('debug')('withSaga')

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function withSaga(saga) {
  return function (WrappedComponent) {
    function mapStateToProps(state) {
      return {
        sagaGenesisReady: state.sagaGenesis.sagaGenesisInit.initialized
      }
    }

    function mapDispatchToProps(dispatch, props) {
      return {
        dispatchPrepareSaga: (props, key) => {
          dispatch({ type: 'PREPARE_SAGA', saga, key, props })
        },

        dispatchRunSaga: (props, key, displayName) => {
          dispatch({ type: `RUN_SAGA_${key}`, saga, props, key, displayName })
        },

        dispatchEndSaga: (key) => {
          dispatch({ type: `END_SAGA_${key}`, key })
        }
      }
    }

    const SagaWrapper = connect(mapStateToProps, mapDispatchToProps)(
      class _SagaWrapper extends PureComponent {
        displayName = `WithSaga(${getDisplayName(WrappedComponent)})`

        constructor(props, context) {
          super(props, context)
          this.sagaKey = ++lastSagaKey
          debug(`constructor ${this.sagaKey}`)
        }

        componentDidMount() {
          debug(`componentDidMount ${this.sagaKey}`)
          if (this.props.sagaGenesisReady) {
            this.prepareSaga(this.props)
          }
        }

        componentWillReceiveProps(nextProps) {
          debug(`componentWillReceiveProps ${this.sagaKey}`)
          if (nextProps.sagaGenesisReady && (this.props.sagaGenesisReady !== nextProps.sagaGenesisReady)) {
            this.prepareSaga(nextProps)
          }
        }

        prepareSaga(props) {
          debug(`prepareSaga ${this.sagaKey}`)
          props.dispatchPrepareSaga(props, this.sagaKey)
        }

        componentWillUnmount() {
          debug(`dispatchEndSaga ${this.sagaKey}`)
          this.props.dispatchEndSaga(this.sagaKey)
        }

        componentDidUpdate () {
          if (this.props.sagaGenesisReady) {
            debug(`dispatchRunSaga ${this.sagaKey}`)
            this.props.dispatchRunSaga(this.props, this.sagaKey, this.displayName)
          }
        }

        render () {
          return <WrappedComponent {...this.props} sagaKey={this.sagaKey}/>
        }
      }
    )

    return SagaWrapper
  }
}
