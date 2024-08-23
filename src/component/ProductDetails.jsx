import React, { useEffect, useState } from 'react'
import Container from './Container'
import { useParams } from 'react-router-dom';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState('')
  console.log(product)
  useEffect(()=>{
    fetch(`http://localhost:3000/products/${id}`)
    .then((response) => response.json())
      .then((data) => setProduct(data))
  }, [])
  return (
    <Container>
      <h2>Product details</h2>
      <div className="bag-item-container">
      <div className="item-left-part">
        <img className="bag-item-img" src={product.image} />
      </div>
      <div className="item-right-part">
        <div className="company">{product.company}</div>
        <div className="item-name">{product.item_name}</div>
        <div className="price-container">
          <span className="current-price">Rs {product.current_price}</span>
          <span className="original-price">Rs {product.original_price}</span>
          <span className="discount-percentage">({product.discount_percentage}% OFF)</span>
        </div>
        <div className="return-period">
          <span className="return-period-days">{product.return_period} days</span>return available</div>
        <div className="delivery-details">Delivery by
          <span className="text-success">{product.delivery_date}</span>
        </div>
      </div>
      <div className="remove-from-cart">
        <button className='btn btn-danger' ><i className='bi bi-trash'></i></button>
      </div>
    </div>
    </Container>
  )
}

export default ProductDetails
