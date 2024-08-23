import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../component/CartItem'
import CartSummary from '../component/CartSummary'
import { useNavigate } from 'react-router-dom'
import { bagActions } from '../store/bagSlics'
import Container from '../component/Container'

function MyCart() {
  const navigate = useNavigate()
  const cartData = useSelector((store) => store.bags)


  // no data in cart than display this
  
  if (cartData.length === 0) {
    return <Container>
      <div className="container">
      <div className="col-md-6 mx-auto text-center">
        <div className="d-flex align-items-center flex-column justify-content-center gap-2" style={{ height: 'calc(100vh - 160px)' }}>
          <h1>Your cart is empty.</h1>
          <button className='btn btn-outline-dark' onClick={() => navigate('/')}>Continue shoping</button>
        </div>
      </div>
    </div>
    </Container>
  } else {
    // data in cart than display this
    return <Container>
      <div className="row">
      <div className="col-md-8 bag-items-container">
        {cartData.map((items) => <CartItem cartItem={items} key={items.id} />)}
      </div>

      <div className="col-md-4 bag-summary">
        <CartSummary />
      </div>
      </div>
    </Container>
  }

}

export default MyCart