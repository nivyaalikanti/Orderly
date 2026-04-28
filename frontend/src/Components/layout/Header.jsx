import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";

import { toast } from "react-toastify"; // 

import Search from "./Search";
import "../../App.css";

const Header = () => {
  const dispatch = useDispatch();

  // Updated slice
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully"); 
  };

  return (
    <>
      <nav className="navbar row sticky-top">
  <div className="container-fluid d-flex align-items: center;"> {/* Added wrapper */}
    
    {/* logo */}
    <div className="col-12 col-md-3">
      <Link to="/">
        <img src="/images/logo.webp" alt="logo" className="logo" />
      </Link>
    </div>

    {/* search */}
    <div className="col-12 col-md-5 mt-2 mt-md-0"> {/* Changed to col-md-5 for better spacing */}
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/eats/stores/search/:keyword" element={<Search />} />
      </Routes>
    </div>

    {/* right side */}
    <div className="col-12 col-md-4 mt-4 mt-md-0 d-flex justify-content-end align-items-center">
      <Link to="/cart" style={{ textDecoration: "none" }}>
        <span className="ml-3" id="cart" style={{ color: "white" }}>Cart</span>
        <span className="ml-1" id="cart_count" style={{ color: "#f97316" }}>{cartItems.length}</span>
      </Link>

      {user ? (
        <div className="ml-4 dropdown d-inline">
          <Link
            to="#"
            className="btn dropdown-toggle text-white d-flex align-items-center"
            id="dropDownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav mr-2 mb-0">
              <img
                src={user?.avatar?.url}
                alt={user?.name}
                className="rounded-circle"
              />
            </figure>
            <span>{user?.name}</span>
          </Link>

          <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
            <Link className="dropdown-item" to="/eats/orders/me/myOrders">Orders</Link>
            <Link className="dropdown-item" to="/users/me">Profile</Link>
            <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Logout</Link>
          </div>
        </div>
      ) : (
        !loading && (
          <Link to="/users/login" className="btn ml-4" id="login_btn" style={{ backgroundColor: "#f97316", color: "white" }}>
            Login
          </Link>
        )
      )}
    </div>
  </div>
</nav>
    </>
  );
};

export default Header;