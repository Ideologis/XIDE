import { Button } from "@/components/ui/button";
import CountDownTimer from "../Features/CountDown";
import moment from "moment";

const Categories = () => {
  const targetDate = moment().add(4, "days").toDate();
  return (
    <div className="categ flex justify-center items-center gap-5 m-20 p-10 overflow-hidden bg-black rounded-3xl max-sm:gap-3 max-sm:m-2 max-sm:p-5">
      <div className="left p-4 flex-1 flex-col justify-center">
        <h3 className="text-sm text-white mb-2 max-sm:text-xs max-sm:mb-1 max-sm:text-center">
          Categories
        </h3>
        <h1 className="text-5xl text-white font-bold mb-6 max-sm:text-2xl max-sm:text-center">
          Enhance Your
          <br />
          Music Experience
        </h1>
        <CountDownTimer showSeparator={false} targetDate={targetDate} />
        <Button className="bg-green-500 hover:bg-green-600 mt-8 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 max-sm:py-1 max-sm:px-2 max-sm:items-center">
          Buy now
        </Button>
      </div>
      <div className="right flex-1">
        <img
          src="/boom_box.png"
          alt=""
          className="bottom-0 w-[80%] object-contain max-sm:hidden"
        />
      </div>
    </div>
  );
};

export default Categories;
