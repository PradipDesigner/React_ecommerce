import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { bagActions } from '../store/bagSlics';
function Header({ userName, showAlert }) {
  const bagItems = useSelector((store) => store.bags);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (userName) {
    var firstLettr = userName.charAt(0)
    var lastLettr = userName.charAt(userName.length - 1)

  }
  const Logout = ()=>{
    localStorage.removeItem('userName'),
    localStorage.removeItem('isLoggedIn'),
    localStorage.removeItem('userId'),
    dispatch(bagActions.clearCart()),

    // // alert msg
    showAlert("Log Out successfully", "bg-success show text-white", "Success"),

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }
  return (
    <nav className="navbar navbar-expand-lg custom-nav bg-dark position-sticky top-0 z-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">React_Ecommerce</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="bi bi-list"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/aboutUs">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeclassname="active" className="nav-link" to="/contactUs">Contact Us</NavLink>
            </li>
          </ul>
            <ul className="navbar-nav ms-auto text-center">
              {!localStorage.getItem('userName') ? (<>
                <li className="nav-item">
                  <NavLink className="nav-link" activeclassname="active" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link position-relative" to="/Mycart"><i className='bi bi-cart-check-fill'></i> ({bagItems.length})</NavLink>
                </li>
              </>) :
                <>
                  <li>
                    <Link className="nav-link position-relative" to="/Mycart"><i className='bi bi-cart-check-fill'></i> ({bagItems.length})</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link" data-bs-toggle="dropdown"> <span className='avtar text-uppercase'>{firstLettr}{lastLettr}</span> <i className='bi bi-chevron-down'></i></Link>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{left: 'auto',right: '0'}}>
                      <li><a className="dropdown-item" href="#"><i className='bi bi-person'></i> Hi, {userName}</a></li>
                      <li><Link className="dropdown-item" onClick={Logout}><i className="bi bi-box-arrow-left"></i> LogOut</Link></li>
                    </ul>
                  </li>
                </>}
            </ul>

        </div>
      </div>
    </nav>
  )
}

export default Header