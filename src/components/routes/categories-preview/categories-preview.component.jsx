import {useContext} from "react";

import CategoryPreview from "../../category-preview/category-preview.component";
import {CategoriesContext} from "../../../context/categories.context";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);


    return (<div className="shop-container">

        {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return <CategoryPreview title={title} key={title} products={products}/>
        })}
    </div>);
}

export default CategoriesPreview;