import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(ViewUI);

Vue.mixin({
    methods:{
        //ajax请求
        request(url, data, method = 'get'){
            return new Promise((resolve) => {
                $.ajax({
                    url: this.$store.state.rootUrl + url,
                    data,
                    method,
                    success(res) {
                        resolve(res);
                    },
                    error(err) {
                        console.log(err);
                    }
                });
            })
        }
    }
});

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
