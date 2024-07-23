import React from 'react'
import { useSelector } from 'react-redux'

const CartSummary = () => {
    const bagItems = useSelector((store)=> store.bags)
    
    const CONVENIENCE_FEE = 99;
    let total_items = bagItems.length;
    let item_price = 0;
    let discount = 0;

    bagItems.forEach((element) => {
        console.log(element)
        item_price += element.original_price
        discount += element.original_price - element.current_price
    });
    let final_amount  = item_price - discount + 99
  return (
    <>
      <div className="bag-details-container">
          <div className="price-header">PRICE DETAILS ({total_items} Items)</div>
          <div className="price-item">
            <span className="price-item-tag">Total MRP</span>
            <span className="price-item-value">₹{item_price}</span>
          </div>
          <div className="price-item">
            <span className="price-item-tag">Discount on MRP</span>
            <span className="price-item-value priceDetail-base-discount">-₹{discount}</span>
          </div>
          <div className="price-item">
            <span className="price-item-tag">Convenience Fee</span>
            <span className="price-item-value">₹{CONVENIENCE_FEE}</span>
          </div>
          <hr />
          <div className="price-footer">
            <span className="price-item-tag">Total Amount</span>
            <span className="price-item-value">₹{final_amount}</span>
          </div>
        </div>
        <button className="btn-place-order">
          <div className="css-xjhrni">PLACE ORDER</div>
        </button>
    </>
  )
}

export default CartSummary
