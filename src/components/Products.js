import React, { useEffect, useState } from "react";
import { getAllProducts } from "../axios-services/productScreen";
 import Product from "./Product";
 import "../style/Products.css"
import Pagination from "./Pagination";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  useEffect(() => {
    (async () => {
      const products = await getAllProducts();
      console.log("Testing Grabing All Products", products);
      setProductList(products);
    })();
  }, []);

//Get current products
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProduct = productList.slice(indexOfFirstProduct, indexOfLastProduct);

//change page
const paginate = (pageNumber)=> setCurrentPage(pageNumber)

  return (
    <div>
    <div className="product__section">
      <div className="product__card">
        {currentProduct.map((product) => {
          const { id, name, image, price, rating } = product;
          return (
            <>
        <Product
              key={id}
              id={id}
              title={name}
              price={price}
              rating={rating}
              image = {image}
            />
        
          </>
          );
          
        })}
      </div>
      
      </div>
      <Pagination productsPerPage={productsPerPage} totalProducts = {productList.length} paginate={paginate} />
    </div>
  );
};
export default AllProducts;