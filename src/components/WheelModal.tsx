import { X } from 'lucide-react';
import Wheel from './Wheel';

const WheelModal = ({
  isOpen,
  onClose,
  points,
  setGamePoints,
  setShowToast,
  showToast
}: {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  setGamePoints: (prev: number) => void;
  setShowToast: (show: boolean) => void;
  showToast: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">🎡 Spin the Wheel</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-semibold text-blue-900">
            Available Game Points: <span className="text-2xl">{points}</span>
          </p>
        </div>

        {/* Placeholder for actual game iframe/content */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Wheel setShowToast={setShowToast} showToast={showToast} points={points} setGamePoints={setGamePoints} />
        </div>
      </div>
    </div>
  );
};

export default WheelModal;
