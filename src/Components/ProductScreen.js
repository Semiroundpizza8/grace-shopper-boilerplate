import React, { useEffect, useState } from 'react';
import { getProductById } from '../axios-services/productScreen';


const ProductScreen = (props) => {
    
    const [singleProduct, setSingleProduct] = useState("");
    
    
    useEffect(async (id) => {
        const oneProduct = await getProductById(id);
        setSingleProduct(oneProduct);
    }, []);



    return (
        
       <div>
            
            <h2>{singleProduct.name}</h2>
            <p> {singleProduct.image}</p>
            <p> Description : {singleProduct.description}</p>
            <p> Stock : {singleProduct.stock}</p>
            <p> Price : {singleProduct.price}</p>
            <p>Category:{singleProduct.category}</p>
            <p>Rating : {singleProduct.reviewstars}</p>
            {/* <button onClick={() => handleAddToCart(singleProduct.id)}>Add To Cart</button> */}
        </div>

    );
};



export default ProductScreen;