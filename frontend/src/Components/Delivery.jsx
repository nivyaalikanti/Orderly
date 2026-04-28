import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveDeliveryInfo } from "../redux/slices/cartSlice";

const Delivery = () => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveDeliveryInfo(deliveryInfo));
    navigate("/checkout");
  };

  return (
    <div className="container mt-5">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h2 className="mb-4">Delivery Information</h2>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control"
                value={deliveryInfo.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                className="form-control"
                value={deliveryInfo.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                className="form-control"
                value={deliveryInfo.postalCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="form-control"
                value={deliveryInfo.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-block py-3 mt-4">
              Proceed to Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
