import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bagActions } from "../store/bagSlics";
import { useDispatch } from "react-redux";
import Toast from "../component/Toast";
import Container from "../component/Container";
import SignUp from "./SignUp";
function Login({ setUser, showAlert }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleClass, setToggleClass] = useState("")
  // const [error, setError] = useState('')
  // const [SuccessMsg, setSuccessMsg] = useState('')
  // const [alert, setAlert] = useState(null)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let URL = "http://localhost:3000/users";

  const HandelSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(URL);
    if (!response) {
      showAlert("Network response was not ok ", "show bg-danger", "Alert");
    }
    const users = await response.json();
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      showAlert("Login success.", "show bg-success text-white", "Success");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("isLoggedIn", "yes");
      setUser(user.name);

      try {
        const cartResponse = await fetch(
          `http://localhost:3000/myCart?userId=${user.id}`
        );
        if (!cartResponse.ok) {
          throw new Error("Error fetching cart data");
        }
        const cartData = await cartResponse.json();

        // Dispatch action to update cart in Redux store
        dispatch(bagActions.initialItems(cartData));
      } catch (cartError) {
        console.error("Error fetching cart data:", cartError);
      }
    } else {
      showAlert(
        "Please enter correct userid and password.",
        "show text-white bg-danger",
        "Alert"
      );
    }
  };

  return (
    <>
      {/* <Toast alert={alert} /> */}
      <Container>
        <div className={`Form-block ${toggleClass}`}>
          <div className="row h-100">
            <div className="col-md-7">
              <div className="form-sec p-4">
                <form className="login-form" onSubmit={HandelSubmit}>
                <h5 className="text-center fw-bold mb-3 mb-md-4">Sign In</h5>

                  <div className="form-group">
                    <input id="username"
                      type="email"
                      className="form-control"
                      placeholder=" "
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="username" className="form-label">Enter Username</label>

                  </div>
                  <div className="form-group">
                    <input id="password"
                      type="password"
                      className="form-control"
                      placeholder=" "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password" className="form-label">Enter Password</label>
                  </div>
                  <p className="text-center"><a href="#">Forgot password?</a></p>
                  <div className="align-items-center d-flex justify-content-between gap-3 flex-wrap">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Submit"
                    />
                    <p className="d-block d-md-none m-0">
                      If you don't have an account. Please click{" "}
                      <button type='button' className="btn btn-link" onClick={()=> setToggleClass("active")}>here</button>
                    </p>
                  </div>
                </form>
                <div className="signup-form">
                <h5 className="text-center fw-bold mb-3 mb-md-4">Sign Up</h5>
                 <SignUp setToggleClass={setToggleClass} showAlert={showAlert} />
                </div>
              </div>
            </div>
            <div className="col-md-5 h-100 toggle-container">
              <div className="signupText-content">
                <h3>Hello, Friends!</h3>
                <p>If you don't have an account than click below Button</p>
              </div>
              <div className="signinText-content">
                <h3>Welcome back!</h3>
                <p>You have already have an account than click below Button</p>
              </div>
              <button className="btn btn-primary signup" onClick={()=> setToggleClass("active")}>
                SignUp
              </button>
              <button className="btn btn-primary signIn" onClick={()=> setToggleClass('')}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
