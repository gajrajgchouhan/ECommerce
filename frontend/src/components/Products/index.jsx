import { useSelector } from "react-redux";
import styled from "styled-components";
import { Product } from "../MiniProduct/index";
import { PageWrapper } from "../../animations";

const Products = () => {
    const products = useSelector((state) => {
        return state.products;
    });

    return (
        <>
            <PageWrapper>
                <ProductsStyle>
                    {products.map((p) => {
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
