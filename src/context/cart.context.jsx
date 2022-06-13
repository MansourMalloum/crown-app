import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0,
    removeItemFromCart: () => null,
    decreaseItem: () => null,
    total: 0,
});


export const CartIconProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);


    const addCartItem = (cartItems, productToAdd) => {
        const existingCartItem = cartItems.find(cart => cart.id === productToAdd.id);
        if (existingCartItem) {
            return cartItems.map(cart => cart.id === productToAdd.id ?
                {...cart, quantity: cart.quantity + 1}
                : cart);
        }
        return [...cartItems, {...productToAdd, quantity: 1}]
    }

    const removeItem = (cartItems, productToRemove) => {
        const existingCartItem = cartItems.find(cart => cart.id === productToRemove.id);
        if (existingCartItem) {
            return cartItems.filter(cart => cart.id !== productToRemove.id)
        }
    }


    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeItem(cartItems, productToRemove))
    }


    const decreaseItem = (productToRemove) => {
        setCartItems(removeOneItem(cartItems,productToRemove))
    }


    const removeOneItem = (cartItems , itemToDecrease) => {
        const existingCartItem = cartItems.find(cart => cart.id === itemToDecrease.id);

        if (existingCartItem) {
            if (existingCartItem.quantity === 1) {
                return cartItems.filter(cart => cart.id !== itemToDecrease.id)
            }

            return cartItems.map(cart => {
                if (cart.id === itemToDecrease.id) {
                    return {...cart, quantity: cart.quantity - 1};
                } else return cart;
            });

        }
    }


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }











    useEffect(() => {
        const newCartItemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const totalCount = cartItems.reduce((total,cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setTotal(totalCount);
        setCartCount(newCartItemCount);
    }, [cartItems])


    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        decreaseItem,
        total
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}