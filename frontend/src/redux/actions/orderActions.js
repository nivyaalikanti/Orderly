import api from "../../utils/api";

import {
    clearErrors,
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    paymentRequest,
    paymentSuccess,
    paymentFail,
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail,
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail,
} from "../slices/orderSlice";

import { clearCart } from "../slices/cartSlice";

// create order
export const createOrder = (session_id) => async (dispatch, getState) => {
    try {
        dispatch(createOrderRequest());
        const { user } = getState().user;   
        const { data } = await api.post("/eats/orders/new", { session_id }, {
            headers: { "Content-Type": "application/json" },
        });
        // Clear cart after successful order
        dispatch(clearCart());
        dispatch(createOrderSuccess(data.order));
    }catch (error) {
        console.error("Order creation error:", error);
        dispatch(createOrderFail(error.response?.data?.message || "Failed to create order"));
    }
};

//payment
export const payment = (items, restaurant) => async (dispatch) => {
    try {
        dispatch(paymentRequest());
        
        // Format items for payment
        const formattedItems = items.map((item) => ({
            name: item.foodItem.name,
            price: item.foodItem.price,
            quantity: item.quantity,
            image: item.foodItem.images?.[0]?.url || "",
        }));

        const { data } = await api.post("/eats/payment/process", { 
            items: formattedItems, 
            restaurant: restaurant._id 
        }, {      
            headers: { "Content-Type": "application/json" },
        });
        
        if (data.url) {
            window.location.href = data.url;
        }
        dispatch(paymentSuccess());
    }catch (error) {
        console.error("Payment Error:", error);
        dispatch(paymentFail(error.response?.data?.message || "Failed to process payment"));
    }   
}

// my orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch(myOrdersRequest());
        const { data } = await api.get("/eats/orders/me/myOrders");
        dispatch(myOrdersSuccess(data.orders));
    }
    catch (error) {

        dispatch(myOrdersFail(error.response?.data?.message || "Failed to fetch orders"));
    }
}

//order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(orderDetailsRequest());
        const { data } = await api.get(`/eats/orders/${id}`);
        dispatch(orderDetailsSuccess(data.order));
    }
    catch (error) {
        dispatch(orderDetailsFail(error.response?.data?.message || "Failed to fetch order details"));
    }
}
