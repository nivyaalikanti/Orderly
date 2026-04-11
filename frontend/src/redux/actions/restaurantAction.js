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