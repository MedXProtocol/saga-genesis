export default function(state, name) {
  var networkId = state.sagaGenesis.network.networkId
  if (state.sagaGenesis &&
      state.sagaGenesis.contracts &&
      state.sagaGenesis.contracts.networks[networkId] &&
      state.sagaGenesis.contracts.networks[networkId].nameAddress
    ) {
    return state.sagaGenesis.contracts.networks[networkId].nameAddress[name]
  }
}
