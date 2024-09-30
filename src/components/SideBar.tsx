import ClockBtn from "../assets/images/clock.png";
import RestartBtn from "../assets/images/restart-btn.png";
const SideBar = () => {
  return (
    <section
      className="absolute right-36 md:-right-52 -bottom-[7.5rem] md:bottom-32 flex
  flex-col items-start gap-1 "
    >
      <div
        className="flex items-center justify-center gap-1 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64
        h-20 md:h-32"
      >
        <img src={ClockBtn} alt="clock btn" className="w-5 md:w-8" />
        <p className="text-amber-900 md:text-lg font-bold ">
          Time Left:{" "}
          <span className="md:text-xl text-green-600 shadow">45 secs</span>
        </p>
      </div>
      <div
        className="flex justify-center items-center gap-3 bg-sidebar-background bg-center bg-contain bg-no-repeat w-64
      h-20 md:h-32"
      >
        <button className="flex items-center gap-3 ">
          <img
            src={RestartBtn}
            alt="restart btn"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p></p>
        </button>
      </div>
    </section>
  );
};

export default SideBar;
