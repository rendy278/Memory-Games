import React from "react";

interface StartModalProps {
  isModalOpen: boolean;
  onStart: () => void;
  closeModal: () => void;
}

const StartModal: React.FC<StartModalProps> = ({
  isModalOpen,
  onStart,
  closeModal,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-gameboard-background bg-center bg-no-repeat p-6 rounded-md shadow-lg flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold mb-4 text-amber-900">
          Start the Game
        </h1>
        <div className="flex justify-center items-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
          <button
            onClick={() => {
              closeModal(); // Close modal first
              onStart(); // Start the game logic after closing modal
            }}
            className="text-amber-900 md:text-2xl font-bold"
          >
            Start
          </button>
        </div>
        <h2 className="text-2xl font-bold mt-4 text-amber-900">
          Game Build By : Rendev
        </h2>
      </div>
    </div>
  );
};

export default StartModal;
