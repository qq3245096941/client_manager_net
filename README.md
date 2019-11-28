### 演示
[客户管理系统网销版](http://www.51tmeng.com/wxClient/#/)
* 账号：admin123
* 密码：admin123
### 监听data里面对象的属性变化
```
 watch: {
    /*监听页码变化*/
    'content.isOpen': {
        async handler(isOpen) {
            if (isOpen === true) {
                let data = (await this.request('/customerIntention/query', {clientCode: this.content.clientCode})).data;
                console.log(data);
            }
        }
    }
},
```
***
###删除客户需调用 /client/update
```
this.request('/client/update', {
    clientCode: params.row.clientCode,
    cooperationStatus:4
}).then(data => {
    if (data.succeed === 1) {
        this.$Message.success('删除成功');
        this.clientList.splice(params.index, 1);
    } else {
        this.$Message.error(data.message);
    }
})
```

### 监听v-for渲染完成
```
this.$nextTick(()=>{
    //执行操作
})
```
在任意地方调用即可，``this.$nextTick``返回``Promise``对象。可以使用``async await``

### 监听路由变化
```
watch:{
  $route(to,from){
    console.log(to.path);
  }
},
```
### iview表格自定义行样式时，需要去掉``style``标签上的``scoped``
***
### 拼接对象为路径
```
createURL(url, param) {
    let urlLink = '';
    $.each(param, (item, key) => {
        let link = '&' + item + "=" + key;
        urlLink += link;
    });
    urlLink = url + "?" + urlLink.substr(1);
    return urlLink.replace(' ', '');
},
```
