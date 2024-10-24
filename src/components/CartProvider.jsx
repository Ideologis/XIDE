import { createContext, useReducer, useEffect } from 'react'
import supabase from '../config/supabase.Client'

export const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  userEmail: null,
  showProfile: true, // Ensure this is set to true by default
};

// New function to load cart from local storage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    // Ensure showProfile is true when loading from localStorage
    return { ...parsedCart, showProfile: true };
  }
  return initialState;
};

const CartReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "SHOW_PROFILE":
      return { ...state, showProfile: action.payload };
    case "REMOVE_PROFILE_FROM_NAVBAR":
      return { ...state, showProfile: false };

    case "SET_USER_EMAIL":
      return { ...state, userEmail: action.payload };

    case "CLEAR_USER": {
      return {
        ...state,
        userEmail: null,
        showProfile: false,
      };
    }
    case "ADD_TO_CART": {
      console.log("Adding to cart:", action.payload);
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        newState = {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      newState = {
        ...state,
        items: updatedItems,
        total: newTotal,
      };
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    case "CLEAR_CART": {
      return { ...state, items: [], total: 0 };
    }
    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!itemToRemove) return state;

      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      newState = {
        ...state,
        items: updatedItems,
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};

function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(
    CartReducer,
    initialState,
    loadCartFromLocalStorage
  );

  useEffect(() => {
    console.log("Cart state updated:", cartState);
    // Save to localStorage, but don't override showProfile
    const stateToSave = { ...cartState, showProfile: true };
    localStorage.setItem("cart", JSON.stringify(stateToSave));
  }, [cartState]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        dispatch({ type: 'SET_USER_EMAIL', payload: user.email })
        dispatch({ type: 'SHOW_PROFILE', payload: true })
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
