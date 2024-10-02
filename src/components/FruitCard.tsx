import React, { useContext } from "react";
import { GameContext } from "../context/MemoryContext";

interface FruitCardProps {
  fruitId: number;
}

const FruitCard: React.FC<FruitCardProps> = ({ fruitId }) => {
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    return null;
  }

  const { cards, flipCard, showIcons } = gameContext;

  // Ensure cards and fruitId are valid
  if (!cards || cards.length === 0 || fruitId < 0 || fruitId >= cards.length) {
    return null;
  }

  const card = cards[fruitId];

  const handleClick = () => {
    if (!card.flipped && !showIcons) {
      flipCard(fruitId);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-[4rem] h-[4rem] md:w-[4.5rem] md:h-[4.5rem] flex justify-center items-center cursor-pointer rounded-lg perspective-1000`}
    >
      <div
        className={`flip-card-inner ${
          card.flipped || showIcons ? "flip-card-flipped" : ""
        }`}
      >
        <div className="flip-card-front bg-amber-800 flex justify-center items-center rounded-lg">
          <p className="text-3xl font-bold text-white">?</p>
        </div>
        <div className="flip-card-back bg-fruit-background bg-center bg-cover flex justify-center items-center">
          <img
            src={card.fruit}
            alt={card.fruit}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FruitCard;
