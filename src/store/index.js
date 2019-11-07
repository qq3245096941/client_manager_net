import Vue from 'vue'
import Vuex from 'vuex'
/*工具方法模块*/
import util from './util'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        util
    }
})
