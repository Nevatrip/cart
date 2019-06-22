const session = '';

export default (store) => {
    store.on('@init', () => ({ session }));

    store.on('session/id', ({ session }, sessionId) => {

        return { session: sessionId };
    });

};
