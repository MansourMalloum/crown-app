import React from "react";
import "./index.scss";

import "./components/directory/directory.styles.scss";
import {Route, Routes} from "react-router-dom";
import Home from "./components/routes/Home.component";

import Navigation from "./components/navigation/navigation.component";
import SignInAndSignup from "./components/SignInAndSignUp/signiandsignup.component";
import Shop from "./components/shop/shop.component";
import Checkout from "./components/checkout/checkout.component";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path="sign-in" element={<SignInAndSignup/>}/>
                <Route path="shop/*" element={<Shop/>}/>
                <Route path="checkout" element={<Checkout/>}/>
            </Route>
        </Routes>

    );
}

export default App;
