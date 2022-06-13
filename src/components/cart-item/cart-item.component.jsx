import "./cart-item.styles.scss";

const CartItem = ({cartItem}) => {
    const {name, quantity, imageUrl, price} = cartItem;
    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className="item-details">
                <span>{name}</span>
                <span>${price} x {quantity}</span>
            </div>
        </div>
    )
}
export default CartItem;