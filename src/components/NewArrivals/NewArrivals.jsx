import FlashSales from "../FlashSales/FlashSales";
import { NewProduct } from "../../../public/flashAssest";
import ArrivalCards from "./ArrivalCards";

const NewArrivals = () => {
  return (
    <div>
      <FlashSales title="Featured" TEXT="New Arrival" showCountDown={false} />
      <div className="container mx-auto p-4 max-sm:p-2">
        <div className="grid grid-cols-4 gap-4 m-20 max-sm:grid-cols-2 max-sm:gap-2 max-sm:m-1">
          {NewProduct.map((product, index) => (
            <ArrivalCards key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
