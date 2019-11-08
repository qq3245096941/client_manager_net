import Vue from 'vue'
import Vuex from 'vuex'
/*工具方法模块*/
import util from './util'
/*绘图工具类*/
import draw from "./draw";
/*客户模块*/
import client from "./client";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rootUrl: 'http://192.168.0.139:8081',
        user: ''
    },
    mutations: {},
    actions: {},
    modules: {
        util, draw, client
    }
})
