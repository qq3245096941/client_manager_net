import Vue from 'vue'
import Vuex from 'vuex'
/* 验证模块 */
import validate from './validate'
/*工具方法模块*/
import util from './util'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        validate, util
    }
})
