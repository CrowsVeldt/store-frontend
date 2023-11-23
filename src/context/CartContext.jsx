import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // does item exist on cart?
    const itemExists = cartItems.find((cartItem) => cartItem._id === item._id);
    // if it does, update quantity by 1+
    if (itemExists) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      // if not add new item to cart
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
      toast.success(`Added ${item.product_name} to cart`);
    }
  };

  const removeFromCart = (item, removeAll = false) => {
    const itemExists = cartItems.find((cartItem) => cartItem._id === item._id);
    if (removeAll) {
      const cartList = cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
      setCartItems(cartList);
    } else if (itemExists?.quantity > 1) {
      const updatedCartItems = cartItems.map((cartItem, index) => {
        if (cartItem._id === item._id) {
          const newQuantity = cartItem.quantity - 1;
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    }
  };

  const resetCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    resetCart,
    setCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
