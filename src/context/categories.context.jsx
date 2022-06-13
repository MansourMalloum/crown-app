import React, {createContext, useEffect, useState} from "react";
import {SHOP_DATA} from '../shop-data.js';
import {addCollectionAndDocuments, getCategoriesAndDocuments} from "../utils/firebase.utils";



export const CategoriesContext = createContext({
    categoriesMap: {},
    // setProducts: () => null
});

export const CategoriesProvider = ({ children }) => {
    const [ categoriesMap , setCategoriesMap ] = useState({});

    useEffect(() => {
        // setProducts(SHOP_DATA);
        // addCollectionAndDocuments("categories", SHOP_DATA);
        const getCategoriesMap = async () => {
            const cat = await  getCategoriesAndDocuments()
            setCategoriesMap(cat);
        }
        getCategoriesMap();
    },[])



    const value = { categoriesMap , setCategoriesMap } ;

    return( <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>)
}
