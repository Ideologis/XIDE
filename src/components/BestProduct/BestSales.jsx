import { Best } from "../../assets/flashAssest";
import FlashCard from "../ProductCard/FlashCard";
import Carousels from "../../Features/Carousels";


const BestSales = () => {
  return (
    <div>
      <Carousels
        // key={Best.id}
        products={Best}
        ProductCardComponent={FlashCard}
      />
    </div>
  );
};

export default BestSales;
