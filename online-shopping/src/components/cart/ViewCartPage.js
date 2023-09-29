// import React from 'react'
// import CartItem from './CartItem'

// const ViewCartPage = () => {
//     // console.log(cartList)


//   return (
//     <div className='row'>
//       {/* {cartList.map((item)=><CartItem key={item.productId} item={item} />
//       )} */}
//     </div>

//   )
// }

// export default ViewCartPage

import React, { useEffect, useState } from "react";

import CartItem from "./CartItem";

import { fetchCartItemsFromApi } from "../../apis/CartApi";

 

const ViewCartPage = () => {

  const [cartItems, updateCartItems] = useState([]);

 

  useEffect(() => {

    fetchCartItemsFromApi().then((response) => {

      // console.log(response)

      updateCartItems(response);

    });

  }, []);

  console.log(cartItems);

 

  return (

    <div className="row">

      {cartItems.map((item) => (

        <CartItem key={item.cartId} item={item} />

      ))}
      

    </div>

   

  );

};

 

export default ViewCartPage;