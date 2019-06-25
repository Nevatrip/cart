// Instruments
import { api } from '../REST';

export default (store) => {
  store.on('@init', () => ({ cart: [] }));

  store.on('cart/get', async () => {
    const sessionId = store.get().session;
    const cartItems = (await api.cart.newCart(sessionId)).products;
    const products = {};

    cartItems.forEach((item) => {
      products[item.productId] = item.productId;
    });

    const productsResponse = await Promise.all(
      Object.keys(products).map((item) => {
        return api.product.getProductData(item);
      })
    );

    productsResponse.forEach((product) => {
      products[product._id] = product;
    });

    const createCart = await cartItems.map((item) => ({
      ...item,
      ...products[item.productId],
    }));

    store.dispatch('cart/addState', createCart);
    store.dispatch('products/get', products);
  });

  store.on('cart/addState', (state, cart) => {
    return { cart };
  });
};
