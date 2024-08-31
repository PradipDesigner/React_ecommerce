import React, { useState } from 'react'
import ProductCard from '../component/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { itemsActions } from '../store/itemSlice'
import { bagActions } from '../store/bagSlics'
import { useNavigate } from 'react-router-dom'
import Toast from '../component/Toast'
import Container from '../component/Container'
import Banner from '../component/Banner'
import Carousel from '../component/Banner'

export default function HomePage({showAlert}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [alert, setAlert] = useState(null)
  const items = useSelector((store) => store.items);
  const [loader, setLoader] = useState(false);
  const [filterItems, setFilterItems] = useState([]);
  const isUserLogedIn = localStorage.getItem('isLoggedIn') !== null;
  const userId = localStorage.getItem('userId');

  // add product in mycart
  const addToCart = async (item) => {
    if (isUserLogedIn) {
      const itemWithUserId = {
        ...item, 
        "userId": userId
      };

      // data post in db
      await fetch(`http://localhost:3000/myCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemWithUserId),
      });

      dispatch(bagActions.addTobag({ id: item.id, ...item }))

      showAlert("items added in your cart", "show bg-success text-white", "Success")
    } 
    // if user not login data set in localstorage
    else {
      showAlert("Please Login!", "show bg-warning text-black", "Warning")

     setTimeout(() => {
      navigate('/login')
     }, 7000);
    }
  };
  
  // cart data remove function
  const removeFromCart = async (itemId) => {
    if (isUserLogedIn) {
      await fetch(`http://localhost:3000/myCart/${itemId}?userId=${userId}`, {
        method: 'DELETE',
      });
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || [];
      localCart = localCart.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
    dispatch(bagActions.removeTobag(itemId));
    showAlert("items deleted from your cart", "show bg-danger text-white", "Alert")

  };

  useEffect(() => {
    setLoader(true)
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(json => {
        dispatch(itemsActions.initialValue(json))
        setFilterItems(json)
        setLoader(false)
      })

  }, [dispatch])

  // category filter function
  const filter = (category) => {
    if (category === 'all') {
      setFilterItems(items)
    }
    else {
      const UpdatedItem = items.filter(product => product.category === category)
      setFilterItems(UpdatedItem)
    }

  }

  const Loader = () => {
    return (
      <div className="text-center p-5">
        <span className='spinner-border'></span>
      </div>
    )
  }
  
  const ShowProduct = () => {
    return (
      <>
      {/* <Carousel /> */}
      <Container>
        <div className="row">
          <div className="col-md-12">
          <h2 className="display-5 m-0 py-3 text-center">Latest Products</h2>
          <hr />
          </div>
        </div>
        <div className="text-center py-4">
            <button type="button" className="btn btn-sm m-2 btn-outline-dark" onClick={() => filter('all')}>All</button>
            <button type="button" className="btn btn-sm m-2 btn-outline-dark" onClick={() => filter("men's wear")}>Men's wear</button>
            <button type="button" className="btn btn-sm m-2 btn-outline-dark" onClick={() => filter("women's wear")}>Women's wear</button>
            <button type="button" className="btn btn-sm m-2 btn-outline-dark" onClick={() => filter('jewelery')}>Jewelery</button>
            <button type="button" className="btn btn-sm m-2 btn-outline-dark" onClick={() => filter('electric')}>Electronics</button>
        </div>
        <div className="row">
          {filterItems.map((items) => <ProductCard key={items.id} product={items} hanledAddcart={addToCart} removeFromCart={removeFromCart} />)}
        </div>
      </Container>
      </>

    )
  }

  return (
    <>
    {/* <Toast alert={alert}/> */}
      {loader ? <Loader /> : <ShowProduct />}

    </>

  )
}
