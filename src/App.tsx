import { useState } from "react";
import { Gamepad2, Check } from "lucide-react";
import { INITIAL_TRANSACTIONS } from "./utils";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import GameModal from "./components/GameModal";
import TransactionsList from "./components/TransactionsList";
import WheelModal from "./components/WheelModal";

function App() {
  const [walletBalance, setWalletBalance] = useState(50000);
  const [airtimeAmount, setAirtimeAmount] = useState("");
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [gamePoints, setGamePoints] = useState(2);
  const [showToast, setShowToast] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showWheelModal, setShowWheelModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCurrentItem, setIsCurrentItem] = useState(0);

  const handlePurchase = async () => {
    const amount = parseFloat(airtimeAmount);

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (amount > walletBalance) {
      alert("Insufficient wallet balance");
      return;
    }

    setIsProcessing(true);

    // Simulate API call to backend
    setTimeout(() => {
      const newTransaction = {
        id: Date.now(),
        amount: amount,
        type: "Airtime Purchase",
        date: new Date().toLocaleString(),
        status: "used",
        timestamp: Date.now(),
      };

      // Update state
      setTransactions((prev) => [newTransaction, ...prev]);
      setWalletBalance((prev) => prev - amount);
      setGamePoints((prev) => prev + 1);
      // setAirtimeAmount('');
      setIsProcessing(false);
      setShowSuccessModal(true);

      // Show toast after modal closes
      setTimeout(() => {
        setShowToast(true);
      }, 500);
    }, 1000);
  };

  const handlePlayGames = () => {
    if (gamePoints === 0) {
      alert("No game points available. Make a transaction to earn points!");
      return;
    }
    setShowGameModal(true);
  };

  const redeemPoints = async (txId: number) => {
    // Simulate API call to backend to redeem points
    try {
      setIsCurrentItem(txId);
      // TODO: Replace with actual API call
      // await fetch('/api/redeem-points', { method: 'POST', body: JSON.stringify({ txId }) });

      setTimeout(() => {
        setTransactions((prev) =>
          prev.map((tx) => (tx.id === txId ? { ...tx, status: "used" } : tx))
        );
        setGamePoints((prev) => Math.max(0, prev + 1));
        setIsCurrentItem(0);
        setShowToast(true);
      }, 2000);
    } catch (error) {
      console.error("Error redeeming points:", error);
      alert("Failed to redeem points. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">Payloop</h1>
          <p className="text-blue-100">Transact. Play. Win.</p>
        </div>

        {/* Wallet Balance */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm mb-1">Wallet Balance</p>
              <p className="text-3xl font-bold text-gray-900">
                ₦{walletBalance.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handlePlayGames}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center gap-2"
            >
              <Gamepad2 className="w-5 h-5" />
              Play Games ({gamePoints})
            </button>
          </div>
        </div>

        {/* Purchase Airtime */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Purchase Airtime</h2>
          <div className="flex gap-3">
            <input
              type="number"
              value={airtimeAmount}
              onChange={(e) => setAirtimeAmount(e.target.value)}
              placeholder="Enter amount"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isProcessing}
            />
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Buy"}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            💡 Each transaction earns you 1 game point
          </p>
        </div>

        {/* Transactions List */}
        <TransactionsList
          transactions={transactions}
          redeemPoints={redeemPoints}
          isCurrentItem={isCurrentItem}
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="🎉 You earned 1 game point! Click 'Play Games' to use it."
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Transaction Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your airtime purchase of ₦{airtimeAmount} was successful.
          </p>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              setAirtimeAmount("");
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 w-full"
          >
            Done
          </button>
        </div>
      </Modal>

      {/* Game Modal */}
      <GameModal
        isOpen={showGameModal}
        onClose={() => setShowGameModal(false)}
        points={gamePoints}
        openWheel={() => setShowWheelModal(true)}
      />
      
      {/* Wheel Modal */}
      <WheelModal
        isOpen={showWheelModal}
        onClose={() => setShowWheelModal(false)}
        points={gamePoints}
        setGamePoints={setGamePoints}
        showToast={showToast}
        setShowToast={setShowToast}
      />

      {/* <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style> */}
    </div>
  );
}

export default App;
