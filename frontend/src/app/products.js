import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./features/api";

export const products = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        set_products: (state, action) => {
            return [...action.payload];
        },

        get_products: (state, action) => {
            return [...state];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            if (state.length === 0) {
                state.push(...action.payload);
            }
        });
    },
});

export const { set_products, get_products } = products.actions;
