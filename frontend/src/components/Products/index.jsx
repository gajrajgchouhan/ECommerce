import { useSelector } from "react-redux";
import styled from "styled-components";
import { Product } from "../MiniProduct/index";
import { PageWrapper } from "../../animations";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsbySearch } from "../../app/features/search";

const Products = () => {
    const location = useLocation();
    const [search, setSearch] = useState(false);

    useEffect(() => setSearch(location.state?.search || false), [location.key]);
    useEffect(() => console.log("search", search), [search]);

    const products = useSelector((state) => state.products);
    const searchResult = useSelector(getProductsbySearch());

    return (
        <>
            <PageWrapper>
                <ProductsStyle>
                    {(search.length > 0 ? searchResult : products).map((p) => {
                        return <Product id={p.id} key={p.id} />;
                    })}
                </ProductsStyle>
            </PageWrapper>
        </>
    );
};

const ProductsStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2.5rem 1.5rem;
    justify-content: space-between;
    @media screen and (max-width: 1001px) {
        justify-content: center;
    }
`;

export default Products;
