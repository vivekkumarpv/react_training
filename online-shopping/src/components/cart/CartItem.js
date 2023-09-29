import React from 'react'

 

const CartItem = ({item}) => {

  // console.log(item)

 

  let productImg =

    "https://source.unsplash.com/random/200x200?sig=" + item.productId;

 

  return (

    // use bootstrap card component

    <div className="col-md-4 col-lg-3">

      {/* // craete a card for each product with same height and width */}

      <div className="card shadow-sm">

        <img className="card-img-top" src={productImg} alt="Card cap" />

        <div className="card-body">

          <h4 className="card-title">{item.cartId}</h4>

          <p className="card-text">{item.productId}</p>

          <p className="card-text">Quantity: {item.quantity}</p>

          <p className="card-text">Total Price: {item.totalPrice}</p>

          <a href="#" className="btn btn-primary">

            Remove from Cart

          </a>

        </div>

      </div>

    </div>

  );

}

 

export default CartItem