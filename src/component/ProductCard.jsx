import { React, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function ProductCard({ product, hanledAddcart, removeFromCart , GotoProduct}) {
    const bagItems = useSelector((store) => store.bags)
    const elementFound = bagItems.some(item => item.id === product.id);


    return (
        <>
        <div className="col-lg-3 col-md-4 col-sm-6 d-flex">
            <div className="mb-4 card product-card w-100">
                <div className="item-image"><img className="" src={product.image} alt={product.nam} /></div>
                <div className="card-body">
                    <div className="rating mt-2">{product.rating.stars} ⭐ | {product.rating.count}</div>
                    <div className="company-name">{product.company}</div>
                    <div className="item-name">{product.item_name}</div>
                    <div className="price"><span className="current-price">Rs {product.current_price}</span>
                        <span className="original-price">Rs {product.original_price}</span>
                        <span className="discount">({product.discount_percentage}% OFF)</span>
                    </div>
                    {!elementFound ?
                        <button type="button" className="btn w-100 btn-success mt-2" onClick={() => hanledAddcart(product)}>Add to Cart</button> :
                        <button type="button" className="btn w-100 btn-danger mt-2" onClick={() => removeFromCart(product.id)}>Remove from Cart</button>}
                </div>
            </div>
        </div></>
    )
}

export default ProductCard