import {createContext, useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}


const userReducer = (state, action) => {
    console.log("Dispatch")
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        default:
            throw new Error(`unhandled type ${type} in userReducer`);
    }

}

const INITIAL_STATE = {
    currentUser: null
}


export const UserProvider = ({children}) => {


    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE)


    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    }

    const value = {currentUser, setCurrentUser};


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            console.log(user);
        })
        return unsubscribe;

    }, []);


    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}

