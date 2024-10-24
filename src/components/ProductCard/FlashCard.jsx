import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { CartContext } from "../../components/CartProvider";
import { toast } from "react-toastify";

const FlashCard = ({ items = {} }) => {
  const { image, name, price, discountPrice, id } = items;
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    console.log("handleAddToCart called with:", { id, name, price, image });
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, name, price: Number(price), image },
    });
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="card  bg-gray-100 shadow-md w-full rounded-sm overflow-hidden flex flex-col group">
      <div className="image  relative  h-64 w-full ">
        <img src={image} alt="" className="object-cover m-7 w-[55%] h-27" />
        <div
          className="disc absolute top-1 left-1 bg-red-500 text-white
        text-xs font-bold px-2 rounded m-2"
        >
          -40%
        </div>
        <div className="icons absolute top-2 right-2">
          <button>
            {" "}
            <CiHeart />{" "}
          </button>
        </div>
        <button
          className="absolute bottom-0 left-1/2 bg-black text-white w-full p-2 rounded-t-md font-semibold text-sm uppercase tracking-wide transform -translate-x-1/2 transition-opacity duration-300 opacity-0 hover:bg-gray-800 group-hover:opacity-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      <div className="imgCont p-2 bg-white">
        <h2 className="text-x font-semibold mb-2">{name}</h2>
        <div className="price flex items-center">
          <span className="text-red-500 font-bold text-xl">₦ {price}</span>
          <span className="ml-2 line-through text-sm text-gray-500">
            ₦ {discountPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
