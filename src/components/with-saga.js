import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

let lastSagaKey = 0

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
        }

        componentWillReceiveProps(nextProps) {
          if (nextProps.sagaGenesisReady && (this.props.sagaGenesisReady !== nextProps.sagaGenesisReady)) {
            nextProps.dispatchPrepareSaga(nextProps, this.sagaKey)
          }
        }

        componentWillUnmount() {
          this.props.dispatchEndSaga(this.sagaKey)
        }

        componentDidUpdate () {
          this.props.dispatchRunSaga(this.props, this.sagaKey, this.displayName)
        }

        render () {
          return <WrappedComponent {...this.props} sagaKey={this.sagaKey}/>
        }
      }
    )

    return SagaWrapper
  }
}
