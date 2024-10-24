import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const ArrivalCards = ({
  name,
  description,
  image,
  altText,
  GridClass,
  isWomen,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-900 text-white ${GridClass} max-sm:rounded-lg max-sm:bg-gray-800`}
    >
      <img
        src={image}
        alt={altText}
        className={`mx-3 object-cover ${isWomen ? "w-full" : ""} h-full max-sm:mx-2 max-sm:object-contain`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 max-sm:p-2">
        <h3 className="text-xl font-bold max-sm:text-sm">{name}</h3>
        <p className="text-sm max-sm:text-xs max-sm:leading-4">{description}</p>
        <NavLink to= "/about">
          <Button className="mt-2 px-4 py-2 bg-white text-black w-40 max-sm:px-2 max-sm:py-1 max-sm:w-20 transition duration-300 ease-in-out transform hover:scale-105 hover:text-white">
            Shop Now
          </Button>

        </NavLink>
      </div>
    </div>
  );
};

export default ArrivalCards;
