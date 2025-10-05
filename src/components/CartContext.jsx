import { createContext, useState } from "react";

// Create Context
export const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
    const apiUrl = "https://flipkart-backend-2-cup2.onrender.com";

    const [quantity, setQuantity] = useState(1);

    const AddToCard = async (prod) => {
        const isExist = cart.some(i => i._id === prod._id)
        if (isExist) {
            return alert("Product exist in cart")
        }
        setCart([...cart, prod]);
        setCount(count + 1);
        alert("Product Added to cart successfully")
    }

    const getQuantity = (q) => {
        setQuantity(q);
    }

    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [order, setOrder] = useState([]);

    return (
        <CartContext.Provider value={{ AddToCard,getQuantity,apiUrl, cart, setCart, count, setCount, setOrder, order,quantity,setQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
