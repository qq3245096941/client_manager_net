export default {
    state: {},
    getters: {
        /**
         *  将对象拼接成路径
         *  url:根路径
         *  param:需要处理的对象
         *  @return url
         */
        createURL: (state, getters, rootState) => (param) => {
            let urlLink = '';
            $.each(param, (item, key) => {
                let link = '&' + item + "=" + key;
                urlLink += link;
            });
            urlLink = rootState.rootUrl + '/client/export.do?' + urlLink.substr(1);
            return urlLink.replace(' ', '');
        },
    }
}