import {createStore} from 'vuex'
// import createPersistedState from "vuex-persistedstate"
import api from '../api'

const User = {
    namespaced: true,
    state: () => ({
        users: []
    }),
    mutations: {
        appendUser(state, user) {
            state.users.unshift(user);
        },
        deleteUser(state, id) {
            const removeIndex = state.users.map(user => user._id).indexOf(id);
            state.users.splice(removeIndex, 1);
        },
        clearUsers(state) {
            state.users = []
        }
    },
    actions: {
        ajaxGetUsers(ctx, params = {}) {
            ctx.commit('clearUsers')
            console.log(params)
            api({
                url: '/users',
                method: 'GET',
                params
            }).then(response => {
                response.data.data.forEach(user => {
                    ctx.commit('appendUser', user);
                });
            })
        }
    },
    getters: {
        allUsers(state) {
            return state.users;
        }
    }
}

export default createStore({
    modules: {
        User
    },
    // plugins: [createPersistedState()],
})