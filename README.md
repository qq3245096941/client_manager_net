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
watch:{
    employeeList() {
        this.$nextTick(()=>{
            //执行操作
        })
    }
}
```

### 监听路由变化
```
watch:{
  $route(to,from){
    console.log(to.path);
  }
},
```