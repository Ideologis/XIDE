import { ButtonDestructive } from "../Button";
import FlashSales from "../FlashSales/FlashSales";


const BestProduct = () => {
  return (
    <div className="flex justify-between">
      <FlashSales title="This Month" TEXT="Best Selling Products" showCountDown={false}/>
      <ButtonDestructive text= 'View All' border={false} />
    </div>
  );
};

export default BestProduct;
