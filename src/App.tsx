import React from "react";
import GameBoard from "./components/GameBoard";
import SideBar from "./components/SideBar";
import GameContextProvider from "./context/MemoryContext";

const App: React.FC = () => {
  return (
    <GameContextProvider>
      <main className="bg-app-banner bg-center bg-cover w-screen h-screen flex flex-col justify-center items-center  relative">
        <div className="absolute bg-sky-800 opacity-50 w-full h-full" />
        <div className="relative -mt-28 md:mt-10 md:-ms-72 lg:ms-0  bg-gameboard-background bg-center bg-no-repeat bg-contain  w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem]">
          <GameBoard />
          <SideBar />
        </div>
      </main>
    </GameContextProvider>
  );
};

export default App;
