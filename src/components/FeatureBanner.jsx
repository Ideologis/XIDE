import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerService2Fill, RiShieldCheckFill } from "react-icons/ri";

const FeatureBanner = () => {
  const FeatureData = [
    {
      icon: <FaTruckFast />,
      title: "FAST AND FREE DELIVERY",
      description: "free delivery for all order over ₦1400",
    },
    {
      icon: <RiCustomerService2Fill />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <RiShieldCheckFill />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];
  return (
    <section className="px-12 mb-8 bg-white max-sm:px-4 max-sm:mb-4">
      <div className="conatiner m-15 px-4 max-sm:m-10 max-sm:px-2">
        <div className="grid grid-cols-3 gap:8 max-sm:grid-cols-1 max-sm:gap-4">
          {FeatureData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 px-4 py-8 rounded-md shadow-sm bg-white text-black text-xl hover:scale-110 duration-300 max-sm:px-2 max-sm:py-4"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full max-sm:w-12 max-sm:h-12">
                <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full text-white max-sm:w-10 max-sm:h-10">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold max-sm:text-base">{item.title}</h3>
              <p className="text-sm font-semibold max-sm:text-xs">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;
