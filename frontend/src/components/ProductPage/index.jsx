import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Stars } from "../Stars";
import { getProduct } from "../../features/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";

export const ProductPage = () => {
    const { id } = useParams();
    const p = useSelector(getProduct(id));

    return (
        <ProductStyle>
            <ImageStyle img={p.image}></ImageStyle>
            <InfoStyle>
                <p className="category">{p.category}</p>
                <h1 className="title">{p.title}</h1>
                <Stars className="stars" {...p.rating} />
                <p className="price">
                    Price: <FontAwesomeIcon icon={faRupeeSign} />
                    {p.price}
                </p>
                <p className="description">{p.description}</p>
            </InfoStyle>
        </ProductStyle>
    );
};

const ProductStyle = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow-y: hidden;
    padding: 2rem;
    & > div {
        margin-left: 1rem;
        margin-right: 1rem;
    }
`;

const ImageStyle = styled.div`
    flex-basis: 40%;
    background-image: url(${(props) => props.img});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const InfoStyle = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex-basis: 50%;
    margin: 1rem;
    .category {
        color: grey;
        font-size: 1.5rem;
    }
    .price {
        font-size: 1.5rem;
    }
    .description {
        font-size: 1.25rem;
    }
`;
