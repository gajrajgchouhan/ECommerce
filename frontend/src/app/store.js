import { products } from "./products";
import { cart } from "./cart";
import authReducer from "./auth";
import { search } from "./search";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    products: products.reducer,
    cart: cart.reducer,
    auth: authReducer,
    search: search.reducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const _persistor = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: _persistor,
    middleware: [thunk],
});

export const persistor = persistStore(store);
