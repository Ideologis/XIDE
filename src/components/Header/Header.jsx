
import Iphone_logo from "/assets/Iphone_logo.png";
import Slider from "../../Features/Slider";

const Header = () => {
  return (
    <div>
      <div className="background bg-black  flex justify-between items-center  p-8 mx-4 my-4 rounded-xl max-sm:flex-col max-sm:mx-5 max-sm:my-5">
        <div className="flex flex-col justify-center gap-3 ml-12 max-sm:ml-0">
          <div className="flex items-center gap-6 text-white ">
            <img
              src={Iphone_logo}
              alt=""
              width={30}
              height={50}
              className=" max-sm:hidden"
            />
            <p className="text-white  text-sm max-sm:text-sm max-sm:pt-4 max-sm:text-center">
              iPhone 14 Series
            </p>
          </div>
          <h2 className="text-white text-left text-5xl font-bold max-sm:text-xl max-sm:pt-4 leading-normal">
            Smooth Sailing to <br />
            Ownership
          </h2>
        </div>
        <div className="w-[80%] max-w-md mr-12 max-sm:w-full max-sm:mr-0 max-sm:mt-4">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Header;
