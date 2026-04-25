import api from "../../utils/api";
import {
    cartRequest,
    cartSuccess,
    cartFail,
    updateCartSuccess,
    removeCartSuccess,
} from "../slices/cartSlice";

// fetch cart items
export const fetchCartItems = () => async (dispatch) => {
    dispatch(cartRequest());
    try {
        dispatch(cartRequest());
        const {data} = await api.get("/eats/cart/get-cart");

        const cartData = data.cart || data.data;
        dispatch(cartSuccess(cartData));
    }
    catch (error) {
        dispatch(cartFail(error.response?.data?.message || "Failed to fetch cart"));
    }
};


//Add cart items
export const addItemToCart = (foodItemId, restaurantId, quantity) => async (dispatch, getState) => {
    try{
        dispatch(cartRequest());
        const {user} = getState().user;
        const {data} = await api.post("/eats/cart/add-to-cart", {
            userId: user._id,
            foodItemId,
            restaurantId,
            quantity
        });
        const cartData = data.cart || data.data;
        dispatch(cartSuccess(cartData));
    }
    catch (error) {
        dispatch(cartFail(error.response?.data?.message || "Failed to add item to cart"));
    }
}

// update cart item quantity
export const updateCartQuantity = (foodItemId , quantity) => async (dispatch, getState) =>   {
    try{
        const {user} = getState().user;
        const {data} = await api.post("/eats/cart/update-cart-item", {
            userId: user._id,
            foodItemId,
            quantity
        });
        const cartData = data.cart || data.data;
        dispatch(updateCartSuccess(cartData));
    }   
    catch (error) {
        dispatch(cartFail(error.response?.data?.message || "Failed to update cart item"));
    }
}


//remove cart item
export const removeItemFromCart = (foodItemId) => async (dispatch, getState) => {
    try{
        const {user} = getState().user; 
        const {data} = await api.delete("/eats/cart/delete-cart-item", {
            data: {
                userId: user._id,
                foodItemId
            }
        });
        const cartData = data.cart || data.data;
        dispatch(removeCartSuccess(cartData));
    }   
    catch (error) {
        dispatch(cartFail(error.response?.data?.message || "Failed to remove cart item"));
    }
}