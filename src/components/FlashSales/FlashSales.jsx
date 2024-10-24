import moment from "moment";
import "./FlashSales.css";
import CountDownTimer from "../../Features/CountDown";

const FlashSales = ({title, TEXT, showCountDown = true}) => {
  const targetDate = moment().add(2, "days").toDate();
  return (
    <>
      <div className="Flashprod m-8">
        <div className="toda flex items-center gap-2 ">
      <div
        className="box"
        style={{
          backgroundColor: "red",
          height: "50px",
          width: "30px",
          borderRadius: "5px",
        }}
      ></div>
      <h1 className="text-2xl font-bold text-red-700 max-sm:text-sm">
        {title}
      </h1>
    </div>
        <div className="Flashtime  flex items-center gap-8 max-sm:flex-col max-sm:gap-2">
          <h1 className="text-3xl mt-4 font-bold text-black max-sm:text-sm ">
            {TEXT}
          </h1>
        { showCountDown && <CountDownTimer targetDate={targetDate} />}
        </div>
      </div>
    </>
  );
};

export default FlashSales;
