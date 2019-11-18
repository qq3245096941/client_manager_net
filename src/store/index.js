import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
/*工具方法模块*/
import util from './util'
/*绘图工具类*/
import draw from "./draw";
/*客户模块*/
import client from "./client";
/*员工模块*/
import employee from "./employee";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                user: val.user
            }
        }
    })],
    state: {
        rootUrl: rootUrl,
        user: ''
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {},
    modules: {
        util, draw, client, employee
    }
})
