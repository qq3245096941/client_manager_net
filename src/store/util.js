export default {
    state:{
        rootUrl:'http://192.168.0.139:8080'
    },
    getters: {
        //ajax请求
        request: (state) => (url, data, method = 'get') => {
            return new Promise((resolve) => {
                $.ajax({
                    url: state.rootUrl + url,
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
}