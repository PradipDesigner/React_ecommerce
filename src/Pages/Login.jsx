import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { bagActions } from '../store/bagSlics'
import { useDispatch } from 'react-redux'
import Toast from '../component/Toast'
import Container from '../component/Container'
function Login({ setUser , showAlert}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  // const [SuccessMsg, setSuccessMsg] = useState('')
  // const [alert, setAlert] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  let URL = 'http://localhost:3000/users'

  const HandelSubmit = async (e) => {
    e.preventDefault()
    let response = await fetch(URL)
    if (!response) {
      showAlert('Network response was not ok ', "show bg-danger", "Alert")
    }
    const users = await response.json();
    const user = users.find((user) =>
      user.username === username && user.password === password
    )
    if (user) {
      showAlert('Login success.', "show bg-success text-white", "Success")
      setTimeout(() => {
        navigate('/')
      }, 3000);
      localStorage.setItem('userName', user.name)
      localStorage.setItem('userId', user.id)
      localStorage.setItem('isLoggedIn', 'yes')
      setUser(user.name)


      try {
        const cartResponse = await fetch(`http://localhost:3000/myCart?userId=${user.id}`);
        if (!cartResponse.ok) {
          throw new Error('Error fetching cart data');
        }
        const cartData = await cartResponse.json();

        // Dispatch action to update cart in Redux store
        dispatch(bagActions.initialItems(cartData));
      } catch (cartError) {
        console.error('Error fetching cart data:', cartError);
      }
    }
    else {
      showAlert('Please enter correct userid and password.', "show text-white bg-danger", "Alert")

    }
  }
  
  return (
      <>
      {/* <Toast alert={alert} /> */}
      <Container>
      <h1 className='text-center'>Login</h1>
      <hr />
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto mt-4">

          <form onSubmit={HandelSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="align-items-center d-flex justify-content-between gap-3 flex-wrap">
              <input type="submit" className="btn btn-dark" value="Submit" />
              <p className='m-0'>If you don't have an account. Please click <Link to="/ragister">here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </Container></>
  )
}

export default Login
