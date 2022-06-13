import React, {useContext, useState} from "react"

import {
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase.utils";

import FormInput from "../form-input/form-input.component";

import Button from "../button/button.component";

import "./sign-in.styles.scss";

import {UserContext} from "../../context/user.context";


const defaultSignInFormField = {
    email: '',
    password: ''
}


const SignIn = () => {

    const [formSignInField, setFormSignInField] = useState(defaultSignInFormField);
    const {email, password} = formSignInField;

    const {setCurrentUser} = useContext(UserContext);

    const logGoogleUser = async () => {
        console.log("logGoogleUser");
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);

    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormSignInField({...formSignInField, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("please enter your Email | Password");
            return;
        }

        try {
            const {user} = await signInUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
        } catch (error) {
            console.log("there is an error while logging");
        }
    }


    return (
        <div className="sign-up-container">
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Enter your email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    name="email"
                />
                <FormInput
                    label="Enter your password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    required
                    name="password"
                />
            <div className="buttons-container">
                <Button type="submit">Log In</Button>
                <Button buttonType="google" onClick={logGoogleUser}>SignIn With Google</Button>
            </div>
            </form>

        </div>
    )
}
export default SignIn;