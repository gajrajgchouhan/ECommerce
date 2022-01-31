import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        console.log("fetching");
        const { data } = await axios.get(API_URL);
        console.log("fetched");
        return data;
    }
);
