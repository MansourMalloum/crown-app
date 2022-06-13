import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {useContext} from "react";
import {CartContext} from "../../context/cart.context";
import {
    useNavigate
} from "react-router-dom";
import {CardDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles";


const CardDropdown = () => {
    const navigate = useNavigate();


    const {cartItems, setIsCartOpen} = useContext(CartContext);


    const navigateToCheckout = () => {
        setIsCartOpen(false);
        navigate("/checkout");
    }

    return (
        <CardDropdownContainer>
            <CartItems>
                {
                    cartItems.length ?
                        (cartItems.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.id}/>))
                        : <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={() => navigateToCheckout()}>Go to checkout</Button>
        </CardDropdownContainer>
    )
}

export default CardDropdown;