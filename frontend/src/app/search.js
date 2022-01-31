import { createSlice } from "@reduxjs/toolkit";

export const search = createSlice({
    name: "search",
    initialState: [],
    reducers: {
        add_search: (state, action) => {
            return [...action.payload];
        },
    },
});

export const { add_search } = search.actions;
