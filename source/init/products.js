const products = {
    products: {},
};

export default (store) => {
    store.on('@init', () => ({ products }));

    store.on('products/get', ({ products }, data) => {

        return { products: data };
    });
};