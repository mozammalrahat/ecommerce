import React from "react";

export interface CartContextType {
  cart: Product[];
  dispatch: React.Dispatch<Action>;
}

interface Product {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

interface Action {
  type: string;
  payload: Product;
}

const initialState: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    quantity: 1,
  },
];

const cartReducer = (state: Product[], action: Action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += action.payload.quantity;
        return updatedCart;
      } else {
        return [...state, action.payload];
      }
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
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
