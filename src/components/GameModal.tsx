import { X, Gamepad2 } from 'lucide-react';

const GameModal = ({
  isOpen,
  onClose,
  points,
}: {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Play & Win</h2>
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
          <Gamepad2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Game content will be loaded here</p>
          <p className="text-sm text-gray-500">
            Backend will provide game interface via iframe or embedded content
          </p>
          <div className="mt-6 space-y-3">
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
              🎡 Spin the Wheel
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
              ⚽ Football Prediction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
