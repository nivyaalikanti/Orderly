import react from "react"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import Menu from "./Components/Menu";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import Login from "./Components/user/Login";
import Register from "./Components/user/Register";
import Profile from "./Components/user/Profile";
import UpdateProfile from "./Components/user/UpdateProfile";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Components/cart/Cart";
import Delivery from "./Components/Delivery";
import ListOrders from "./Components/order/ListOrders";
import OrderDetails from "./Components/order/OrderDetails";
import OrderSuccess from "./Components/cart/OrderSuccess";
function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
    <>
    <ToastContainer/>
    <Router>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eats/stores/search/:keyword" element={<Home />} />
        <Route path="/eats/stores/:id/menus" element={<Menu />} />
        {/* user */}
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<Register />} />
        <Route path="/users/me" element={<Profile/>} />
        <Route path="/users/me/update" element={<UpdateProfile />} />
        {/* cart */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        {/* orders */}
        <Route path="/eats/orders/me/myOrders" element={<ListOrders />} />
        <Route path="/eats/orders/:id" element={<OrderDetails />} />
        {/* success */}
        <Route path="/success" element={<OrderSuccess />} />
      </Routes>
      </main>
      <Footer />
    </Router>
    </>
  );
}

export default App
