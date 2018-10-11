export function addLogListener(address, fromBlock) {
  return {
    type: 'ADD_LOG_LISTENER',
    address,
    fromBlock
  }
}

export function removeLogListener(address) {
  return {
    type: 'REMOVE_LOG_LISTENER',
    address
  }
}
