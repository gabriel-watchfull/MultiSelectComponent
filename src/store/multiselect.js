export default ({
    state: {
        tags: [],
    },
    mutations: {
        'add:userSelected': (state, payload) => {
            state.tags.push(payload);
        },
        'remove:userSelected': (state, payload) => {
            state.tags = state.tags.filter(item => item.name !== payload.name);
        },
    },
    actions: {
        'add:tags': ({ commit }, name) => {
            commit('add:userSelected', name);
        },
        'remove:tag': ({ commit }, user) => {
            commit('remove:userSelected', user);
        },
    },
    getters: {
        tags: state => state.tags,
    }
});