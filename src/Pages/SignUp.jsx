import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp({ showAlert, setToggleClass }) {
  const navigate = useNavigate(); //for navigate url
  const [user, setUser] = useState({ name: "", username: "", password: "" }); //for set user details

  const HandleOnChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const SignUp = async (event) => {
    event.preventDefault();
    const userResponse = await fetch("http://localhost:3000/users");
    const users = await userResponse.json();
    const checkExitsUser = users.find(
      (exitingUser) => exitingUser.username === user.username
    ); //validate exiting user
    // if user already ragister
    if (checkExitsUser) {
      showAlert(
        "This Email Already ragister Please Login",
        "show bg-danger text-white",
        "Alert"
      );
      setTimeout(() => {
        setToggleClass(" ");
      }, 3000);
    } else {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();

      if (result) {
        // localStorage.setItem('user', JSON.stringify(user))
        showAlert(
          "Your account SignUp successfully. Please login now!",
          "bg-success show text-white",
          "Success"
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  return (
    <form onSubmit={SignUp}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="textinput"
          name="name"
          placeholder=" "
          value={user.name}
          onChange={HandleOnChange}
          required
        />
        <label className="form-label" htmlFor="textinput">
          Enter Name
        </label>
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="username"
          placeholder=" "
          value={user.username}
          onChange={HandleOnChange}
          required
        />
        <label className="form-label" htmlFor="exampleInputEmail1">
          Enter your email
        </label>
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          placeholder=" "
          value={user.password}
          onChange={HandleOnChange}
          required
        />
        <label className="form-label" htmlFor="exampleInputPassword1">
          Create password
        </label>
      </div>
      <div className="align-items-center d-flex justify-content-between gap-3 flex-wrap">
        <input type="submit" className="btn btn-dark" value="Ragister" />

        <p className="m-0">
          already have an account.{" "}
          <button
            type="button"
            className="btn btn-link p-0 fw-semibold"
            onClick={() => setToggleClass("")}
          >
            log in here
          </button>
        </p>
      </div>
    </form>
  );
}

export default SignUp;
