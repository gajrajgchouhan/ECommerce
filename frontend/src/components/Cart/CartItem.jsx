import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { addToCart, removeFromCart } from "../../app/features/cart";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function CartItem({ id, title, price, count, image }) {
    const dispatch = useDispatch();
    const itemPrice = price * count;

    return (
        <Item>
            <img className="image" src={image}></img>
            <div className="info">
                <div className="title">{title}</div>
                <div className="buttons">
                    <span className="count">Qty: {count}</span>
                    <button onClick={() => dispatch(addToCart(id))}>+</button>
                    <button onClick={() => dispatch(removeFromCart(id))}>
                        -
                    </button>
                </div>
            </div>
            <div className="price">
                <FontAwesomeIcon icon={faRupeeSign} />
                {itemPrice.toFixed(3)}
            </div>
        </Item>
    );
}

const Item = styled.div`
    display: flex;
    width: 100%;
    padding: 1rem;
    font-weight: 100;
    border-bottom: 1px solid grey;
    .image {
        width: 120px;
        margin-right: 1rem;
    }
    .info {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .title {
        font-size: 1rem;
    }
    .button {
        display: inline-flex;
    }
    .count {
        margin-right: 0.5rem;
    }
    button {
        width: 2rem;
        border: 1px solid black;
        outline: 0;
        background-color: transparent;
    }
    .price {
        width: 20%;
        font-weight: bold;
        font-size: 32px;
    }
`;
