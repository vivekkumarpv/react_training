// // import React, { useState } from 'react'
// // import AddProductPage from './AddProductPage'
// // import ViewProductPage from './ViewProductPage'

// // const ProductPage = () => {


// //   let product = {
// //     productId:101,
// //     productName:'Laptop',
// //     productPrice:50000,
// //     productDescription:'Laptop with Windows 11',
// //   }


// //   let [productList, updateProductList] = useState([product]);


 

// //   return (
// //     <div>
// //       <div className='container'>
// //         <div className='row'>
// //           <div className='col-12'>
// //           <AddProductPage productList={productList} updateProductList={updateProductList}/>
// //           </div>
// //           <div className='col-12'>
// //           <ViewProductPage productList={productList}/>
// //           </div>
// //           </div>
// //           </div>
// //     </div>
// //   )
// // }

// // export default ProductPage

// import React, { useState } from 'react'
// import AddProductPage from './AddProductPage'
// import ViewProductPage from './ViewProductPage'
// import { Route, Routes } from 'react-router-dom'
// import ViewCartPage from '../cart/ViewCartPage'

// const ProductPage = () => {


//   let product = {
//     productId:101,
//     productName:'Laptop',
//     productPrice:50000,
//     productDescription:'Laptop with Windows 11',
//   }


//   let [productList, updateProductList] = useState([product]);
//   let [cartList, updateCartList] = useState([]);

 

//   return (
//     <div>
//       <div className='container'>
//         <div className='row'>
//           <div className='col-12'>
//           <Routes>
//            <Route path='/add-product' element={<AddProductPage productList={productList} updateProductList={updateProductList}/>} />
//            <Route path='/view-products' element={<ViewProductPage productList={productList} updateCartList={updateCartList} cartList={cartList}/>} />
//            <Route path='/cart' element={<ViewCartPage cartList={cartList}/>}/>
//       </Routes>
//           </div>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default ProductPage


// {/* 

//  <AddProductPage productList={productList} updateProductList={updateProductList}/>
//           </div>
//           <div className='col-12'>
//           <ViewProductPage productList={productList}/>
//           </div>
//           </div>
//  */}
