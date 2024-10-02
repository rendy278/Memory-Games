import React, { useContext } from "react";
import { GameContext } from "../context/MemoryContext"; // Pastikan Anda mengimpor tipe GameContextType
import ScoreIcon from "../assets/images/score.png";
import RestartIcon from "../assets/images/restart-btn.png";
import Confetti from "react-confetti";

const Overlay: React.FC = () => {
  const context = useContext(GameContext);

  // Periksa apakah context terdefinisi
  if (!context) {
    throw new Error("Overlay must be used within a GameContextProvider"); // Tambahkan error handling
  }

  const { gameOver, gameWon, restartGame, score } = context; // Ambil nilai dari context

  if (!gameOver && !gameWon) return null; // Return null if neither game over nor won

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-50 rounded-xl">
      <h1 className="text-orange-300 text-5xl md:text-8xl font-serif font-bold mb-8">
        {gameOver ? "Game Over 😥" : "You Win 🎉"}
      </h1>

      <div className="flex items-center gap-3 mt-10">
        <img src={ScoreIcon} alt="Score icon" className="w-10 h-10" />
        <p className="text-4xl uppercase font-bold text-white">
          Your Score: <span className="text-green-500 text-5xl">{score}</span>
        </p>
      </div>

      <div className="mt-10 flex justify-center items-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        <button onClick={restartGame} className="flex items-center gap-3">
          <img
            src={RestartIcon}
            alt="Restart icon"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-amber-900 md:text-lg font-bold">Replay</p>
        </button>
      </div>

      {gameWon && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          gravity={0.03}
          colors={["#f44336", "#00ff00", "#0000ff", "#ffff00", "#9c27b0"]}
        />
      )}
    </div>
  );
};

export default Overlay;
