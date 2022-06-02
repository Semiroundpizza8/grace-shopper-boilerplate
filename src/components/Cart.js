//Cannot fix the cart until the order functions are ready


import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { addNewCart, deleteCart, patchCart, getMyCartProductbyUserId, createProductCart } from '../axios-services/cart';
import { getProductById } from '../axios-services/productScreen';
const Cart = () => {




    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [productsInCart, setProductsInCart] = useState();
    const [myCartList, setMyCartList] = useState("");
    const [editCount, setEditCount] = useState("");
    const [editPrice, setEditPrice] = useState("");
  //const [myDBCartProducts, setMyDBCartProducts] = useState();
    const [cartProduct, setCartProduct] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [singleProduct, setSingleProduct] = useState([]);

    const userId = localStorage.getItem('userId');
    //const myLocalCartProducts = JSON.parse(localStorage.getItem('cartProductArray'));
    const activeCart = JSON.parse(localStorage.getItem('ActiveCart'));
   console.log(activeCart);

useEffect(() => { (async () => {
let myDBCartProducts;
let products=[];
if (userId){
  myDBCartProducts = await getMyCartProductbyUserId(userId);
  setProductsInCart(myDBCartProducts);
}
  if (!userId) {
    setProductsInCart(activeCart)
  }

  // const product = productsInCart.map(async item => {
  //   let id = item.productId
  //   let product = await getProductById(id);
  //   item.name = product.name;
  //   item.description = product.description
  // })
  // console.log("singleproduct",singleProduct);
   setSingleProduct(singleProduct);
// function sum(array){
//   for (let i=0; i<array.lenght; i++){
//   for (let j=0; j<array.length; j++){
//   if(array[i].productId = array[j].productId){
//     let newQuantity = array[i].quantity + array[j].quantity;
//     delete array[j];
//     array[i].quantity = newQuantity;
//   }
// }
// } return array;
// }

// products = sum(products);


  
  //localStorage.setItem('ActiveCart', JSON.stringify(products));

  console.log("myCart", productsInCart)

})();
}, []);

// const handleGetProduct = async (prodId) => {
//       const singleProduct = await getProductById(prodId);
//      // console.log("singleproduct",singleProduct);
//       setSingleProduct(singleProduct);
//   };
  

const handleDeleteCart = async (cartId, event) => {
  event.preventDefault();
 const deletedCart =  await deleteCart(cartId);
 const myCartList = await getMyCartProductbyUserId(userId);
 setProductsInCart(myCartList)
}



    const handleQuantityChange = (event) => {
      event.preventDefault();
      try{
        setQuantity(event.target.value);
    }catch(error){
        throw error
    }
    }

    const handleEditCart = async (cartId, event) => {
        event.preventDefault();
       console.log("creating a new item in the cart");
             try{const editedCart = await patchCart(cartId, quantity, price)
                const myCartList = await getMyCartProductbyUserId(userId);
                setProductsInCart(myCartList)
            }
             catch(error){
               console.log(error)
             }
         }




    
        return (
        <div> 
          <div>
            <h2> Here all the items in your cart: </h2> 
            <div>
              {!productsInCart ? 
              <div> Nothing to show, yet! Add a products to your cart! </div>  : 
              <div> 
                {productsInCart.map(product => 
                  <>
                    <div key={product.productId}> 
                      <img src={product.image} style={{"height": '100px'}}></img>
                      <p>product name:{product.name}</p>
                      <p>product description:{product.description}</p>
                      <p>product id:{product.productId}</p>
                      <p>product quantity:{product.quantity}</p>
                      <p>product price:{product.price}</p>
                      {
                        <button 
                        key={product.id} 
                        onClick={() => { 
                          setEditOpen({ open: !editOpen, id: product.id  }) 
                        }}
                        editOpen={editOpen}>
                          Edit Product
                        </button>
                        }
                        {editOpen.open && editOpen.id === product.id ? 
                        <> New Product quantity:
                                <input value={editCount}
                                    onChange={handleQuantityChange} />
                                New total price :
                                <button onClick={(event) => { handleEditCart(product.id, event) }}>Submit Edited cart</button>
                        </> : null}  
                      {<button onClick={(id, event) => { handleDeleteCart(id, event) }}>Delete</button>}
                    </div>
                    </>)}
              </div>}
            </div>
        </div>
        </div>)
}


export default Cart;