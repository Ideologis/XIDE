import useCountDown from "../hooks/Moment";

const CountDownTimer = ({ targetDate, showSeparator = true }) => {
  const timeLeft = useCountDown(targetDate);
  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };
  return (
    <div className="flex space-x-4 p-2 rounded-lg">
      {Object.entries(timeLeft).map(([interval, value], index) => (
        <div
          key={interval}
          className="bg-white text-black rounded-full w-20 h-20 flex items-center justify-center font-bold max-sm:w-14 max-sm:h-16  max-md:h-20"
        >
          <div className="m-4 max-sm:m-2">
            <div className="text-black font-bold text-sm capitalize max-sm:text-xs">
              {interval}
            </div>
            <div className="rounded-full flex items-center justify-center mb-2 max-sm:mb-1">
              <span className="text-3xl font-bold max-sm:text-xl">
                {addLeadingZero(value)}
              </span>
            </div>
          </div>
          {showSeparator && index < Object.entries(timeLeft).length - 1 && (
            <span className="text-4xl font-bold text-red-500 ml-2 self-center max-sm:text-3xl max-sm:ml-1">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CountDownTimer;
