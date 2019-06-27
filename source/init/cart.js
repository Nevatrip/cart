// Instruments
import { api } from '../REST';
import { async } from 'q';

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

    cartItems.forEach((item) => {
      products[item.productId].key = item.key;
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

  store.on('cart/delItem', async ({ cart }, productKey) => {

    const sessionId = store.get().session;
    const products = store.get().products;
    const totalData = store.get().totalData;

    delete totalData[productKey];

    for (const key in products) {
      if (products[key].key === productKey) {
        delete products[key];
      }
    }

    const cartUpdate = cart.filter((product) => product.key !== productKey);

    store.dispatch('cart/addState', cartUpdate);
    store.dispatch('products/get', products);
    store.dispatch('totalData/get', totalData);

    await api.cart.deleteItem(sessionId, productKey);

  });
};
