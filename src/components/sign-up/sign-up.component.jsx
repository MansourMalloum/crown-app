import {useContext, useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";
import Button from "../button/button.component";
import {UserContext} from "../../context/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SingUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const { setCurrentUser } =  useContext(UserContext);

    const handleChange = (event) => {
        const {name, value} = event.target;
        // console.log({[name]: value});
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password and confirmpassword doesn't match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            setFormFields(defaultFormFields);
            setCurrentUser(user)

        } catch (error) {
            console.log("Error while creating user")
        }


    }


    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Display Name"
                    value={displayName}
                    onChange={handleChange}
                    name="displayName"
                    type="text" required />


                <FormInput
                    label="Email"
                    onChange={handleChange}
                    value={email}
                    name="email" type="email" required/>


                <FormInput
                    label="Password"
                    onChange={handleChange}
                    value={password}
                    name="password" type="password" required/>


                <FormInput
                    label="Confirm Password"
                    onChange={handleChange}
                    value={confirmPassword}
                    name="confirmPassword" type="password" required/>

                <Button type="submit" >Submit</Button>
            </form>
        </div>
    )
}
export default SingUpForm;