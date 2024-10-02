import { useContext } from "react";
import ClockBtn from "../assets/images/clock.png";
import RestartBtn from "../assets/images/restart-btn.png";
import { GameContext } from "../context/MemoryContext";

const SideBar: React.FC = () => {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return null;
  }

  const { timeLeft, restartGame, gameOver } = gameContext;

  return (
    <section
      className="absolute right-36 md:-right-52 -bottom-[7.5rem] md:bottom-32 flex
  flex-col items-start gap-1"
    >
      <div className="flex items-center justify-center gap-1 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32 ">
        <img src={ClockBtn} alt="Clock Icon" className="w-5 md:w-6" />
        <p className="text-amber-900 md:text-lg font-bold">
          Time Left:{" "}
          <span className=" text-green-600 shadow">
            {gameOver ? "Game Over" : `${timeLeft} secs`}
          </span>
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64 h-20 md:h-32">
        <button onClick={restartGame} className="flex items-center gap-3">
          <img
            src={RestartBtn}
            alt="Restart Icon"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-amber-900 md:text-lg font-bold">Replay</p>
        </button>
      </div>
    </section>
  );
};

export default SideBar;
