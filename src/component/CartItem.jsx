import React from 'react'
import { useDispatch } from 'react-redux'
import { bagActions } from '../store/bagSlics';

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId')
  const removeFromCart = () => {
    fetch(`http://localhost:3000/myCart/${cartItem.id}?userId=${userId}`,{
      method:'DELETE'
    })
    dispatch(bagActions.removeTobag(cartItem.id))
  }
  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img className="bag-item-img" src={cartItem.image} />
      </div>
      <div className="item-right-part">
        <div className="company">{cartItem.company}</div>
        <div className="item-name">{cartItem.item_name}</div>
        <div className="price-container">
          <span className="current-price">Rs {cartItem.current_price}</span>
          <span className="original-price">Rs {cartItem.original_price}</span>
          <span className="discount-percentage">({cartItem.discount_percentage}% OFF)</span>
        </div>
        <div className="return-period">
          <span className="return-period-days">{cartItem.return_period} days</span>return available</div>
        <div className="delivery-details">Delivery by
          <span className="delivery-details-days">{cartItem.delivery_date}</span>
        </div>
      </div>
      <div className="remove-from-cart">
        <button className='btn btn-danger' onClick={removeFromCart}><i className='bi bi-trash'></i></button>
      </div>
    </div>
  )
}

export default CartItem
