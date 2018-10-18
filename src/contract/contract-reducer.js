export default function (state, {type, address, name, contractKey, networkId}) {
  if (typeof state === 'undefined') {
    state = {
      networks: {
      /*
        [networkId]: {
          nameAddress: {},
          addressContractKey: {}
        }
      */
      }
    }
  }

  switch (type) {
    case 'ADD_CONTRACT':
      var networkConfig = state.networks[networkId] || {}
      // console.log('in ADD_CONTRACT', networkConfig, state.networks, networkId)
      state = {
        networks: {
          ...state.networks,
          [networkId]: {
            ...networkConfig,
            addressContractKey: {
              ...networkConfig.addressContractKey,
              [address]: contractKey
            }
          }
        }
      }
      networkConfig = state.networks[networkId] || {}

      // refactor out name in favour of contractKey
      if (name) {
        state = {
          networks: {
            ...state.networks,
            [networkId]: {
              ...networkConfig,
              nameAddress: {
                ...networkConfig.nameAddress,
                [name]: address
              }
            }
          }
        }
      }
      break

    // no default
  }

  return state
}
