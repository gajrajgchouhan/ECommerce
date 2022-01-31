import { createSelector } from "reselect";

export const filterID = (products, id) =>
    products.filter((val) => val.id === Number(id))[0];

const nullProduct = {
    title: null,
    price: null,
    description: null,
    image: null,
    rating: null,
};

export const getProduct = (id) =>
    createSelector([(state) => state.products], (products) => {
        if (products === null) return nullProduct;
        else {
            return filterID(products, id);
        }
    });

export const getMultipleProduct = (ids) =>
    createSelector([(state) => state.products], (products) => {
        if (products === null) return nullProduct;
        else {
            return ids.map((id) => filterID(products, id));
        }
    });
