import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeItemFromCart,
  updateCartQuantity,
} from "../../redux/actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee, faTrash } from "@fortawesome/free-solid-svg-icons";
import { payment } from "../../redux/actions/orderActions";
import { toast } from "react-toastify"; 

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, restaurant } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success("Item removed from cart"); 
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) {
      toast.error("Exceeded stock limit");
      return;
    }
    dispatch(updateCartQuantity(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      dispatch(updateCartQuantity(id, newQty));
    } else {
      toast.error("Minimum quantity reached"); 
    }
  };

  const checkoutHandler = () => {
    dispatch(payment(cartItems, restaurant));
    navigate("/delivery");
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2 className="page-title">
          Your Cart ({cartItems.length} items)
        </h2>
        {restaurant && (
          <h3>Restaurant: <b>{restaurant.name}</b></h3>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h2>Your Cart is empty</h2>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={item.foodItem.images[0].url}
                  alt={item.foodItem.name}
                />
                <div className="cart-item-info">
                  <h4>{item.foodItem.name}</h4>
                  <p className="food-price">
                    <FontAwesomeIcon icon={faIndianRupee} size="xs" />
                    {item.foodItem.price}
                  </p>
                </div>
                <div className="quantity-control">
                  <button 
                    className="minus" 
                    onClick={() => decreaseQty(item.foodItem._id, item.quantity)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                  />
                  <button 
                    className="plus"
                    onClick={() => increaseQty(
                      item.foodItem._id,
                      item.quantity,
                      item.foodItem.stock
                    )}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="delete-cart-item"
                  onClick={() => removeCartItemHandler(item.foodItem._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>

          <div className="order-summary-card">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} units</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>
                <FontAwesomeIcon icon={faIndianRupee} size="xs" />
                {cartItems.reduce((acc, item) => acc + item.quantity * item.foodItem.price, 0).toFixed(2)}
              </span>
            </div>
            <button className="btn btn-primary checkout-btn" onClick={checkoutHandler}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
