import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartItems } from "../../app/features/cart";
import styled from "styled-components";
import CartItem from "./CartItem";

export const Cart = () => {
    const items = useSelector(getCartItems());
    const [price, setPrice] = useState(0);

    const loadRazorpay = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onerror = () => {
            alert("cant load rzrpay");
        };

        script.onload = async () => {
            try {
                const { data: order } = await axios.post(
                    "http://127.0.0.1:5000/create-order",
                    {
                        amount: price,
                    }
                );
                console.log(order);

                const { amount, id: order_id, currency } = order;

                const options = {
                    key: "rzp_test_glyvhWarg5Vl9d",
                    amount: amount.toString(),
                    currency: currency,
                    name: "example name",
                    description: "example transaction",
                    order_id: order_id,
                    handler: (response) => console.log(response),
                    prefill: {
                        name: "example name",
                        email: "email@example.com",
                        contact: "111111",
                    },
                    notes: {
                        address: "example address",
                    },
                    theme: {
                        color: "#80c0f0",
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                alert(error);
            }
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (items === null) return;
        let totalPrice = 0;
        items.map((item) => {
            console.log(price, item.count, item.price);
            totalPrice += item.count * item.price;
            return null;
        });
        setPrice(totalPrice);
    }, [items]);

    if (price === 0) {
        return <div>Empty cart...</div>;
    }

    return (
        <>
            <CartStyle>
                {items.map((item) => (
                    <CartItem key={item.id} {...item}></CartItem>
                ))}
                <div className="price">
                    Price : <FontAwesomeIcon icon={faRupeeSign} />
                    {String(price).substring(0, 7)}
                </div>
                <div className="check-out" onClick={loadRazorpay}>
                    Check out
                </div>
            </CartStyle>
        </>
    );
};

const CartStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    .item {
        width: 100%;
    }
    .check-out {
        background-color: black;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        cursor: pointer;
    }
`;
