import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../component/CartItem'
import CartSummary from '../component/CartSummary'
import { useNavigate } from 'react-router-dom'
import { bagActions } from '../store/bagSlics'
import Container from '../component/Container'

function MyCart({cartItem}) {
  const navigate = useNavigate()
  

  // no data in cart than display this
  
  if (cartItem.length === 0) {
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
      <div className="bag-items-container">
        {cartItem.map((items) => <CartItem cartItem={items} key={items.id} />)}
      </div>

      <div className="bag-summary">
        <CartSummary />
      </div>
    </Container>
  }

}

export default MyCart