import  { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import FlashSales from "../../components/FlashSales/FlashSales";

import { ButtonDestructive } from "../../components/Button";
import BestProduct from "../../components/BestProduct/BestProduct";
import BestSales from "../../components/BestProduct/BestSales";
import SalesCarousels from "../../components/SalesCarousels/SalesCarousels";
import Categories from "@/components/Categories";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import FeatureBanner from "../../components/FeatureBanner";
import Footer from "../../components/Footer/Footer";
import Confetti from 'react-confetti';
import supabase from '../../config/supabase.Client'

// ... rest of the file remains unchanged

const Home = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const shouldShowConfetti = localStorage.getItem('showConfetti');
    if (shouldShowConfetti === 'true') {
      setShowConfetti(true);
      localStorage.removeItem('showConfetti');
      setTimeout(() => setShowConfetti(false), 5000); // Remove confetti after 5 seconds
    }
  }, []);

  console.log(supabase);

  return (
    <div>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <Navbar />
      <Header />
      <FlashSales title="Today's" TEXT="FLASH SALES" />
      <div>
        <SalesCarousels />
        <ButtonDestructive text="View All Product" />
      </div>
      <div>
        <BestProduct />
        <BestSales />
      </div>
      <Categories />
      <NewArrivals />
      <FeatureBanner />
      <Footer />
    </div>
  );
};

export default Home;
