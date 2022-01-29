import { createSelector } from "reselect";
import { add_cart } from "../app/cart";

export const addToCart = (id) => (dispatch) => {
    dispatch(add_cart({ ids: [id] }));
};

export const getCartItems = () =>
    createSelector(
        [(state) => state.products, (state) => state.cart.ids],
        (products, ids) => {
            if (products === null || !ids) return null;
            else {
                console.log(products, ids);
                return Object.keys(ids).map((id) => {
                    const obj = { ...products.filter((p) => p.id == id)[0] };
                    console.log(obj);
                    obj["count"] = ids[id].count;
                    return obj;
                });
            }
        }
    );
