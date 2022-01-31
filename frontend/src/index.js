import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { GlobalStyles } from "./styles";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { fetchProducts } from "./app/features/api";

// 1. Change quantity in cart ; 2. Styled scroll bar

store.dispatch(fetchProducts());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles />
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
