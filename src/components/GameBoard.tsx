import FruitCard from "./FruitCard";

const GameBoard = () => {
  return (
    <div className=" absolute top-[34%] md:top-[35%] left-[26%] w-[16.5rem] h-[16.5rem]  md:w-[19rem] md:h-[19rem] mx-auto items-center grid grid-cols-4">
      <FruitCard />
    </div>
  );
};

export default GameBoard;
