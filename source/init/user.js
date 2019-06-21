const user = {
    fullName: '',
    email:    '',
    phone:    '',
};

export default (store) => {
    store.on('@init', () => ({ user }));

    store.on('user/change', ({ user }, newUserData) => {
        user[newUserData];

        return { user };
    });
};
