import React, { useContext, useState } from "react";
import GameBoard from "./components/GameBoard";
import SideBar from "./components/SideBar";
import GameContextProvider, { GameContext } from "./context/MemoryContext";
import Overlay from "./components/Overlay";
import StartModal from "./components/StartModal";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Track modal state

  return (
    <GameContextProvider>
      <GameContent setIsModalOpen={setIsModalOpen} />
    </GameContextProvider>
  );
};

const GameContent: React.FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsModalOpen }) => {
  const { startGame, isGameStarted } = useContext(GameContext)!;

  const handleStartGame = () => {
    startGame(); // Start the game logic
    setIsModalOpen(false); // Close modal after starting the game
  };

  return (
    <main className="bg-app-banner bg-center overflow-hidden bg-cover w-screen h-screen flex flex-col justify-center items-center relative">
      <div className="absolute bg-sky-800 opacity-50 w-full h-full" />
      <div className="relative -mt-28 md:mt-10 md:-ms-72 lg:ms-0 bg-gameboard-background bg-center bg-no-repeat bg-contain w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem]">
        {isGameStarted && <GameBoard />}
        {isGameStarted && <SideBar />}
      </div>
      <Overlay />
      <StartModal
        isModalOpen={!isGameStarted} // Show the modal only when game hasn't started
        onStart={handleStartGame}
        closeModal={() => setIsModalOpen(false)} // Close modal function
      />
    </main>
  );
};

export default App;
