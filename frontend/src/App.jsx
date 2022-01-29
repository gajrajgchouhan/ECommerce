import React from "react";
import Products from "./components/Products/index";
import { Route, Routes } from "react-router-dom";
import { ProductPage } from "./components/ProductPage/index";
import Nav from "./components/Nav";
import { Cart } from "./components/Cart/index";

function App() {
    return (
        <>
            <Nav />
            <div className="App">
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={"404"} />
                </Routes>
            </div>
        </>
    );
}

export default App;
