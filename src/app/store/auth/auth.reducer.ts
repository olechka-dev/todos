const initialState = {
    todos: {
        create: '*',
        read: '*',
        update: '*',
        // delete: '*'
    },
    stats: {
        create: '*',
        read: '*',
        update: '*',
        delete: '*'
    },
};

export function userPermissionsReducer(state = initialState, action) {
    return {...state};
}
