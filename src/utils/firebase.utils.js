import { initializeApp } from 'firebase/app';
import {getAuth ,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { getFirestore ,
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    getDocs,
    writeBatch } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAZbDOwL2q0D-AznoVODcRuGC4RpT8PtKk",
    authDomain: "crwn-clothing-db-d1c0c.firebaseapp.com",
    projectId: "crwn-clothing-db-d1c0c",
    storageBucket: "crwn-clothing-db-d1c0c.appspot.com",
    messagingSenderId: "266846352566",
    appId: "1:266846352566:web:00d617de153af6e90ba217",
    measurementId: "G-WZBQPCXDNL"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth , provider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();


export  const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {

    if(!userAuth) return ;

    const userDocRef = await doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch (e){
            console.log(e.message());
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return  await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);



export  const addCollectionAndDocuments = async (collectionKeys, objectsToAdd) => {
    const collectionRef = collection(db, collectionKeys);

    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef,obj);
    });

    await batch.commit();
    console.log("done");
}




export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot =  await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title , items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});
    return categoryMap;
}




