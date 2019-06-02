// Instruments
import { MAIN_URL } from './config';

export const api = {
    // cart: {
    //     newCart (sessionId) {
    //         return fetch(`${MAIN_URL}/${sessionId}/products`, {
    //             method:  'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(),
    //         });
    //     },
    // },
    product: {

        async getProductData (productId) {

            const response = await fetch(`${MAIN_URL}/product/${productId}/cart`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            return result;
        },

        async productDates (productId) {

            const response = await fetch(`${MAIN_URL}/product/${productId}/dates`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            return result;
        },
    },

};
