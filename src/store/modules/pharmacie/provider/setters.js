export default {
    SET_CONFIG: (state, data) => (state.config = data),
    SET_USERS: (state, data) => (state.users = data),
    SET_SELL_PRODUCTS: (state, data) => (state.products = data),
    SET_CATEGORIES: (state, data) => (state.categories = data),
    SET_CART: (state, data) => {
        let exists = false;
        for (let el of state.cart) {
            if (el.produit_id === data.produit_id) {
                el.operation_qte++;
                exists = true;
                break;
            }
        }
        if (!exists) {
            state.cart.push(data);
        }
    },
};