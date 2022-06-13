import {useContext} from 'react';

import "./checkout-item.styles.scss";
import {CartContext} from "../../context/cart.context";


const CheckoutItem = ({cartItem}) => {

    const {removeItemFromCart, addItemToCart, decreaseItem} = useContext(CartContext);

    const {name, imageUrl, price, quantity} = cartItem;

    const clearItemHandler = () => removeItemFromCart(cartItem);

    const addItemHandler = () => addItemToCart(cartItem);

    const decreaseItemHandler = () => decreaseItem(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
           <div className="arrow" onClick={decreaseItemHandler}>
               &#10094;
           </div>
                {quantity}
                <div className="arrow" onClick={addItemHandler}>
               &#10095;
           </div>

       </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}
export default CheckoutItem;