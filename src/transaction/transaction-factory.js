let transactionIds = 0

export function nextId() {
  transactionIds += 1
  return transactionIds
}
