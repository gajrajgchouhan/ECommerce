import { createSelector } from "reselect";

export const getProduct = (id) =>
    createSelector([(state) => state.products], (products) => {
        if (products === null)
            return {
                title: null,
                price: null,
                description: null,
                image: null,
                rating: null,
            };
        else {
            return products.filter((val) => val.id === Number(id))[0];
        }
    });

export const getMultipleProduct = (ids) =>
    createSelector([(state) => state.products], (products) => {
        if (products === null)
            return {
                title: null,
                price: null,
                description: null,
                image: null,
                rating: null,
            };
        else {
            return ids.map(
                (id) => products.filter((val) => val.id === Number(id))[0]
            );
        }
    });
