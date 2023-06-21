import React from "react";
import { CartProduct } from "./types";
export interface CartContextType {
  cart: CartProduct[];
  dispatch: React.Dispatch<Action>;
}

type Action =
  | {
      type: string;
      payload?: {
        id: number;
        name: string;
        price: string;
        imageSrc: string;
        quantity: number;
      };
    }
  | {
      type: string;
      payload?: { id: number };
    };

const initialState: CartProduct[] = [];

const cartReducer = (
  state: CartProduct[] | any = initialState,
  action: Action
): CartProduct[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("Dispatched action: ", action.payload);
      const existingProductIndex = state.findIndex(
        (item: CartProduct) => item.id === action.payload?.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      return state.filter(
        (item: CartProduct) => item.id !== action.payload?.id
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const CartContext = React.createContext<CartContextType | null>(null);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = React.useReducer(cartReducer, initialState);
  const CartContextValue: CartContextType = { cart, dispatch };
  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
export { CartContext };
