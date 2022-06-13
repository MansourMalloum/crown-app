import React from "react";
import {signInWithGooglePopup, createUserDocumentFromAuth, auth} from "../../utils/firebase.utils";
import SingUpForm from "../sign-up/sign-up.component";
import SignIn from "../sign-in/sign-in.component";

import "./signiandsignup.styles.scss";


const SignInAndSignup = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return (
        <div className="sign-in-sign-out">
            <div>
                <h1>Sign In page</h1>
                <SignIn/>
                <SingUpForm/>
            </div>

        </div>
    )
}
export default SignInAndSignup;