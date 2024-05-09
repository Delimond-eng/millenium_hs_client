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
                if (el.operation_qte > data.produit_stocks) {
                    el.operation_qte -= 1;
                    Swal({
                        icon: "warning",
                        title: "Avertissement de stock",
                        text: `le stock actuel pour ce produit est de ${data.produit_stocks} unités !`,
                    });
                }
                exists = true;
                break;
            }
        }
        if (!exists) {
            state.cart.push(data);
        }
    },
    SET_CURRENT_CLIENT: (state, data) => (state.client = data),
    SET_SELLER_REPORTS: (state, data) => (state.seller_reports = data),
};