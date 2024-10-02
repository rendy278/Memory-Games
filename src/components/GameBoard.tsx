import FruitCard from "./FruitCard";
import { useContext } from "react";
import { GameContext } from "../context/MemoryContext";

const GameBoard = () => {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return null;
  }

  const { cards } = gameContext;

  return (
    <div className="absolute top-[34%] left-[25.5%] md:top-[35%] md:left-[26.5%] w-[16.5rem] h-[16.5rem]  md:w-[19rem] md:h-[19rem] mx-auto items-center grid grid-cols-4">
      {cards.map((_, index) => (
        <FruitCard key={index} fruitId={index} />
      ))}
    </div>
  );
};

export default GameBoard;
