import { product } from "../../../public/flashAssest";
import Carousels from "../../Features/Carousels";
import FlashCard from "../ProductCard/FlashCard";

const SalesCarousels = () => {
  return (
    <div>
      <h2 className="hidden max-sm:block max-sm:font-bold max-sm:text-center max-sm:text-red-700 max-sm:text-xs max-sm:italic">
        SWIPE TO VIEW MORE
      </h2>
      <Carousels products={product} ProductCardComponent={FlashCard} />
    </div>
  );
};

export default SalesCarousels;
