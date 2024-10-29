import { Best } from "../../../public/flashAssest";
import FlashCard from "../ProductCard/FlashCard";
import Carousels from "../../Features/Carousels";

const BestSales = () => {
  return (
    <div>
      <h2 className="hidden max-sm:block max-sm:font-bold max-sm:text-center max-sm:text-red-700 max-sm:text-xs max-sm:italic">
        SWIPE TO VIEW MORE
      </h2>
      <Carousels
        // key={Best.id}
        products={Best}
        ProductCardComponent={FlashCard}
      />
    </div>
  );
};

export default BestSales;
