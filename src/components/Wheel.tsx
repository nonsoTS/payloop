import { useRef, useState } from "react";
import { PrizeWheel } from "@mertercelik/react-prize-wheel";
import type { Sector, PrizeWheelRef } from "@mertercelik/react-prize-wheel";
import "@mertercelik/react-prize-wheel/style.css";
import Toast from "./Toast";

export default function Wheel({
  setGamePoints,
  points,
  showToast,
  setShowToast,
}: {
  setGamePoints: (prev: any) => void;
  points: number;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
}) {
  const [message, setMessage] = useState("");
  const wheelRef = useRef<PrizeWheelRef>(null);

  const sectors: Sector[] = [
    { id: 1, label: "2% Cashback", probability: 10 },
    { id: 2, label: "₦100 Airtime", probability: 10 },
    { id: 3, label: "Shopping Voucher", probability: 5 },
    { id: 4, label: "2GB Data", probability: 5 },
    { id: 5, label: "Try Again", probability: 10 },
    { id: 6, label: "₦100 Airtime", probability: 10 },
  ];

  const handleSpinEnd = (sector: Sector) => {
    console.log("Winner:", sector.label);
    if (sector.label === "Try Again") {
      setMessage("Sorry, you didn't win this time. Try again!");
    } else {
      setMessage(`Congratulations! You won ${sector.label}`);
    }
    setShowToast(true);
  };

  return (
    <>
      <div>
        <PrizeWheel
          ref={wheelRef}
          sectors={sectors}
          onSpinEnd={handleSpinEnd}
          wheelColors={["#FF6B6B", "#4ECDC4"]}
        />

        <button
          onClick={() => {
            if (points <= 0) {
              alert("You don't have enough points to spin the wheel.");
              return;
            }
            wheelRef.current?.spin();
            setGamePoints((prev: number) => Math.max(0, prev - 1));
            setShowToast(false);
            setMessage("");
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Spin the Wheel
        </button>
      </div>

      {showToast && (
        <Toast message={message} onClose={() => setShowToast(false)} />
      )}
    </>
  );
}
