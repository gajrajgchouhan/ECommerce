import { createSelector } from "reselect";
import { add_search } from "../search";
import { filterID } from "./product";

export const addToSearch = (ids) => (dispatch) => {
    dispatch(add_search(ids));
};

export const getProductsbySearch = () =>
    createSelector(
        [(state) => state.products, (state) => state.search],
        (products, search) => {
            if (products === null) return null;
            if (search.length === 0) return products;
            return search.map((id) => filterID(products, id));
        }
    );
