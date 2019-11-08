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
                        render:(h, param)=>{
                            return h('Button', {
                                props: {
                                    type: 'success',
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({path: '/AddClass', query: {code: param.row.lvCode}});
                                    }
                                }
                            }, '修改');
                        },
                        width: 100
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