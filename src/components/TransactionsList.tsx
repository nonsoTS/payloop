import { Check, Clock } from "lucide-react"
import type { Transaction } from "../utils"

const TransactionsList = ({ transactions, redeemPoints, isCurrentItem }: { transactions: Transaction[], redeemPoints: (txId: number) => void, isCurrentItem: number }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{tx.type}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <p className="font-bold text-gray-900">₦{tx.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      {tx.status === 'unused' ? (
                        <>
                          <button
                            onClick={() => redeemPoints(tx.id)}
                            className="flex items-center gap-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors cursor-pointer"
                          >
                            <Clock className="w-4 h-4" />
                            {isCurrentItem === tx.id ? 'Running...' : 'Redeem Point'}
                          </button>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            Redeemed
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  )
}

export default TransactionsList