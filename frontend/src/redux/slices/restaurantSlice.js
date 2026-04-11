import { createSlice } from "@reduxjs/toolkit";
import { getRestaurants } from "../actions/restaurantAction";

const initialState = {
    restaurants: [],
    count: 0,
    loading: false,
    error: null,
    showVegOnly: false,
    pureVegRestaurantsCount: 0,
};

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        sortByRating: (state) => {
            state.restaurants.sort((a, b) => b.ratings - a.ratings);
        },
        sortByReviews: (state) => {
            state.restaurants.sort((a, b) => b.numOfReviews - a.numOfReviews);
        },
        toggleVegOnly: (state) => {
            state.showVegOnly = !state.showVegOnly;
            state.pureVegRestaurantsCount = calculatePureVegCount(state.restaurants, state.showVegOnly);
        },
        clearError: (state) => {
            state.error = null;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurants.pending, (state) => {   
                state.loading = true;
                state.error = null;
            })
            .addCase(getRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload.restaurants;
                state.count = action.payload.count;
                
            })
            .addCase(getRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch restaurants";
            });
    },

});

export const { sortByRating, sortByReviews, toggleVegOnly, clearError } = restaurantSlice.actions;
export default restaurantSlice.reducer;

// Helper function to calculate pure veg restaurants count
const calculatePureVegCount = (restaurants, showVegOnly) => {
    if (!showVegOnly) return restaurants.length;
    return restaurants.filter(restaurant => restaurant.isPureVeg).length;
};