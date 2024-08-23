import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../component/Toast';
import Container from '../component/Container';
function SignUp({showAlert}) {
  const navigate = useNavigate();  //for navigate url
  const [user, setUser] = useState({ name: '', username: '', password: '' }) //for set user details
  // const [alert, setAlert] = useState('')

  const HandleOnChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const SignUp = async (event) => {
    event.preventDefault();
    const userResponse = await fetch('http://localhost:3000/users')
    const users = await userResponse.json()
    const checkExitsUser = users.find((exitingUser) => exitingUser.username === user.username) //validate exiting user
    // if user already ragister
    if (checkExitsUser) {
      showAlert("This Email Already ragister Please Login", "show bg-danger text-white", "Alert")

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    else {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();

      if (result) {
        // localStorage.setItem('user', JSON.stringify(user))
        showAlert('Your account SignUp successfully. Please login now!', 'bg-success show text-white', 'Success')
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };
  
  return (
    <>
      {/* <Toast alert={alert} /> */}
      <Container>
        <h1 className='text-center'>Ragister</h1>
        <hr />
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto mt-4">
            <form onSubmit={SignUp}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="textinput"
                  name="name"
                  placeholder="Enter your name"
                  value={user.name}
                  onChange={HandleOnChange}
                  required />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="username"
                  placeholder="Enter your email"
                  value={user.username}
                  onChange={HandleOnChange}
                  required />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  placeholder="Create Password"
                  value={user.password}
                  onChange={HandleOnChange}
                  required />
              </div>
              <div className="align-items-center d-flex justify-content-between gap-3 flex-wrap">
                <input type="submit" className="btn btn-dark" value="Ragister" />
                <p className='m-0'>already have an account. <Link to="/login">log in here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignUp;
