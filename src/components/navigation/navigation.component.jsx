import React, {useContext} from "react";
import {Link, Outlet} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

import {UserContext} from "../../context/user.context";
import {signOutUser} from "../../utils/firebase.utils";
import CardIcon from "../card-icon/card-icon.component";
import CardDropdown from "../cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../context/cart.context";
import {LogoContainer, NavigationContainer, NavLink, NavLinks} from "./navigation.styles";

const Navigation = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);


    const handleSignOut = async () => {
        await signOutUser();
        setCurrentUser(null);
    }



    return (<React.Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo/>
            </LogoContainer>
            <NavLinks>
                <Link to="/shop" className="nav-link">SHOP</Link>
                {
                    currentUser ? (
                        <NavLink as="span" onClick={handleSignOut}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/sign-in" className="nav-link">SIGN IN</NavLink>
                    )
                }
                <CardIcon/>
            </NavLinks>
            {  isCartOpen && <CardDropdown/>  }

        </NavigationContainer>
        <Outlet/>
    </React.Fragment>)
}
export default Navigation;