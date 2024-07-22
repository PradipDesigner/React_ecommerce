import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import MyCart from './Pages/MyCart'
import Login from './Pages/Login'
import { useDispatch } from 'react-redux'
import { bagActions } from './store/bagSlics'
import { useSelector } from 'react-redux'
import About from './Pages/About'
import ProductDetails from './Pages/ProductDetails'
import PageNotFound from './Pages/PageNotFound'
import ContactUs from './Pages/ContactUs'
function App() {
  const [user, setUser] = useState('')
  const dispatch = useDispatch()

  const cartItem = useSelector((store) => store.bags)
  const isUserLogedIn = localStorage.getItem('isLoggedIn') !== null;
  const userId = localStorage.getItem('userId')

  // for 
  useEffect(() => {
    const username = localStorage.getItem('userName')
    setUser(username)
  }, [])

  useEffect(() => {
    if (isUserLogedIn) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/myCart?userId=${userId}`);
          const result = await response.json();

          // Dispatch actions to add fetched items to the bag
          dispatch(bagActions.initialItems(result))
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }

  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Header userName={user} />
        <div className="wrapper py-4">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Mycart" element={<MyCart cartItem={cartItem} />}></Route>
            <Route path='/ragister' element={<SignUp />}></Route>
            <Route path='/login' element={<Login setUser={setUser} />}></Route>
            <Route path="/aboutUs" element={<About />}></Route>
            <Route path='/contactUs' element={<ContactUs/>} />
            <Route path="/product" element={<ProductDetails/>}/>
            <Route path='*' element={<PageNotFound/>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
