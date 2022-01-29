import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Stars } from "../Stars";
import { addToCart } from "../../features/cart";
import { useSelector } from "react-redux";
import { getProduct } from "../../features/product";

export const Product = ({ id }) => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const cartRef = useRef(null);
    const p = useSelector(getProduct(id));

    useEffect(() => {
        if (hovered) {
            cartRef.current.classList.add("hovered");
        } else {
            cartRef.current.classList.remove("hovered");
        }
    }, [hovered]);

    return (
        // Add link
        <ProductStyle>
            <ProductImage
                className={"img-wrapper"}
                img={p.image}
                onClick={(e) => {
                    nav(`/product/${id}`);
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <span
                    onClick={(e) => {
                        // no bubbling
                        e.stopPropagation();
                        dispatch(addToCart(id));
                    }}
                    className="cart-button"
                    ref={cartRef}
                >
                    Add to Cart
                </span>
            </ProductImage>
            <InfoStyle>
                <Title className="title">{p.title}</Title>
                <Stars {...p.rating}></Stars>
                <div className="price">
                    <FontAwesomeIcon icon={faRupeeSign} />
                    {p.price}
                </div>
            </InfoStyle>
        </ProductStyle>
    );
};

const ProductStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 450px;
    align-items: center;
    background-color: white;
    font-size: 16px;
    margin: 1rem;
    border-radius: 10px;
    .img-wrapper {
        width: 300px;
        @media screen and (max-width: 767.97px) {
            width: 100%;
        }
    }
    @media screen and (max-width: 767.97px) {
        width: 100%;
        max-width: 400px;
    }
`;

export const ProductImage = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(${(props) => props.img});
    cursor: pointer;
    position: relative;
    .cart-button {
        background-color: black;
        color: white;
        padding: 0.5rem;
        font-size: 0.875rem;
        font-weight: 400;
        cursor: pointer;
        position: absolute;
        border-radius: 10px;
        overflow: hidden;
        right: 0;
        bottom: 0;
        z-index: 10;
        transition: ease-in-out 0.5s;
        opacity: 0;
    }
    .hovered {
        opacity: 1;
    }
`;

const InfoStyle = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding: 6px;
    width: 100%;
    max-height: 50%;
    .title,
    .price {
        text-align: left;
        margin: 4px;
        padding: 4px;
    }
`;

const Title = styled.div`
    height: 2rem;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
