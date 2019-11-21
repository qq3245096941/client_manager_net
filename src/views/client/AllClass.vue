<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>客户管理</BreadcrumbItem>
                <BreadcrumbItem>所有等级</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Table :loading="loading" :columns="classTable" :data="data"></Table>
    </Card>
</template>

<script>
    export default {
        name: "AllClass",
        data() {
            return {
                classTable: [
                    {
                        title: '等级名称',
                        key: 'lvName',
                        width: 100
                    },
                    {
                        title: '等级描述',
                        key: 'lvRemarks'
                    },
                    {
                        title: '操作',
                        width: 200,
                        render: (h, param) => {
                            return h('ButtonGroup', {}, [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                    },
                                    style:{
                                      display:this.user.userType===3?'none':'block'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({path: '/AddClass', query: {code: param.row.lvCode}});
                                        }
                                    }
                                }, '修改'),
                               /* h('Button', {
                                    props: {
                                        type: 'error'
                                    },
                                    style:{
                                        display:this.user.userType===3?'none':'block'
                                    },
                                    on: {
                                        click: () => {
                                            if (!confirm('确定删除吗?')) return;

                                            this.request('/lv/delete', {
                                                ids: param.row.lvCode
                                            }).then(data => {
                                                this.$Message.success('删除成功');
                                                this.data.splice(param.index, 1);
                                            })
                                        }
                                    }
                                }, '删除')*/
                            ])
                        }
                    }
                ],
                data: [],
                loading: false
            }
        },
        mounted() {
            this.loading = true;
            this.request('/lv/query').then(data => {
                this.data = data.data;
                this.loading = false;
            })
        }
    }
</script>

<style scoped>

</style>