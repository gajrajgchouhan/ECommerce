import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
    name: "cart",
    initialState: {
        count: 0,
        ids: {},
    },
    reducers: {
        add_cart: (state, action) => {
            const s = JSON.parse(JSON.stringify(state));
            action.payload.ids.forEach((id) => {
                const exist = s.ids[id] !== undefined;
                if (exist) {
                    s.ids[id].count++;
                } else {
                    s.ids[id] = {
                        count: 1,
                    };
                }
                s.count++;
            });
            return s;
        },
        get_cart: (state, action) => {
            return {
                ...state.ids,
            };
        },
        remove_cart: (state, action) => {
            const s = JSON.parse(JSON.stringify(state));
            action.payload.ids.forEach((id) => {
                if (s.ids[id].count == 1) {
                    s.count--;
                    delete s.ids[id];
                    return;
                }
                s.ids[id].count--;
                s.count--;
            });
            return s;
        },
    },
});

export const { add_cart, get_cart, remove_cart } = cart.actions;
