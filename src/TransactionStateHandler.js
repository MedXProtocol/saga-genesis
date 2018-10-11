export class TransactionStateHandler {
  handle (transaction) {
    return {
      onError: (cb) => {
        if (!this.hasError && transaction && transaction.error) {
          cb(transaction.error)
          this.hasError = true
        }

        return this.handle(transaction)
      },

      onTxHash: (cb) => {
        if (!this.hasTxHash && transaction && transaction.txHash) {
          cb(transaction.txHash)
          this.hasTxHash = true
        }

        return this.handle(transaction)
      },

      onReceipt: (cb) => {
        if (!this.hasReceipt && transaction && transaction.receipt) {
          cb(transaction.receipt)
          this.hasReceipt = true
        }

        return this.handle(transaction)
      },

      onConfirmed: (cb) => {
        if (!this.hasConfirmed && transaction && transaction.confirmed) {
          cb()
          this.hasConfirmed = true
        }

        return this.handle(transaction)
      }
    }
  }
}
