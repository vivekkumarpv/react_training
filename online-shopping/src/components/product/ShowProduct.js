import React from 'react'

const ShowProduct = ({ products }) => {
    return (
        <div className='col-4 card-style'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Product Details</h3>
                    <p>ID : {products.productId}</p>
                    <p>Product Name : {products.productName}</p>
                    <p>Price : {products.productPrice}</p>
                    <p>Product Description : {products.productDescription}</p>
                </div>
            </div>
        </div>

    )
}
export default ShowProduct
