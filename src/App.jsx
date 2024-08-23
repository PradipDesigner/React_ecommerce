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
import About from './Pages/About'
import ProductDetails from './component/ProductDetails'
import PageNotFound from './Pages/PageNotFound'
import ContactUs from './Pages/ContactUs'
import Toast from './component/Toast'
import CheckOut from './Pages/CheckOut'
function App() {
  const [user, setUser] = useState('')
  const [alert , setAlert] = useState(null)
  const dispatch = useDispatch()

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


  const showAlert = (message, style, headMsg) => {
    setAlert({
      msg: message,
      style: style,
      headMsg: headMsg,
    })
    setTimeout(() => {
      setAlert({
        msg: "",
        style: "",
        headMsg:"",
      })
    }, 5000);
  }
  return (
    <>
      <BrowserRouter>
      <Toast alert={alert} />
        <Header userName={user} showAlert={showAlert}/>
        <div className="wrapper py-4">
          <Routes>
            <Route path="/" element={<HomePage showAlert={showAlert}/>}></Route>
            <Route path="/Mycart" element={<MyCart />}></Route>
            <Route path='/ragister' element={<SignUp showAlert={showAlert}/>}></Route>
            <Route path='/login' element={<Login setUser={setUser} showAlert={showAlert}/>}></Route>
            <Route path="/aboutUs" element={<About />}></Route>
            <Route path='/contactUs' element={<ContactUs/>} />
            <Route path="/product/:id" element={<ProductDetails/>}/>
            <Route path='*' element={<PageNotFound/>} />
            <Route path='/checkout' element={<CheckOut/>} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
