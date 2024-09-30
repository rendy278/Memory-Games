import Apple from "../assets/images/fruits/apple.png";

const FruitCard = () => {
  return (
    <section
      className="relative w-[4rem] h-[4rem] md:w-[4.5rem] md:h-[4.5rem]
    flex items-center cursor-pointer rounded-lg  perspective-1000"
    >
      <div className=" flip-card-inner">
        <div className="flip-card-front bg-amber-800 flex justify-center items-center rounded-lg ">
          <p className="text-3xl font-bold text-white">?</p>
        </div>
        <div className="flip-card-back bg-fruit-background bg-center bg-cover flex justify-center items-center ">
          <img
            src={Apple}
            alt="fruits"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FruitCard;
