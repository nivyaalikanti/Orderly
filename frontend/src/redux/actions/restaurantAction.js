import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../utils/api";

export const getRestaurants = createAsyncThunk(
    "restaurants/getRestaurants",
    async(keyword="", {rejectWithValue}) => {
        try {
            const {data} = await api.get(`/eats/stores?keyword=${keyword}`);
            console.log("Fetched restaurants:", data);
            return {
                restaurants: data.restaurants,
                count: data.count,
            }
        }
        catch(error){
            return rejectWithValue(error.response.data.message || "Failed to fetch restaurants");
        }
    });

// create restaurant - admin
export const createRestaurant = createAsyncThunk(
    "restaurants/createRestaurant",
    async (restaurantData, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/eats/stores", restaurantData, {
                headers: { "Content-Type": "application/json" },
            });
            return data.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to create restaurant");
        }
    }
);

//delete restaurant - admin
export const deleteRestaurant = createAsyncThunk(
    "restaurants/deleteRestaurant",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/eats/stores/${id}`);
            return {
                id,
                message: "data.message",
            };
        }
            
        
        catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to delete restaurant");
        }
    }
);
