import { product } from "../../../public/flashAssest";
import Carousels from "../../Features/Carousels";
import FlashCard from "../ProductCard/FlashCard";

const SalesCarousels = () => {
  return (
    <div>
      <Carousels products={product} ProductCardComponent={FlashCard} />
    </div>
  );
};

export default SalesCarousels;
