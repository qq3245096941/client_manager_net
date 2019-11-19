<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>所有标签</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Table disabled-hover :row-class-name="setTableStyle" :columns="labelTable" :data="labelList"></Table>
    </Card>
</template>

<script>
    export default {
        name: "AllLabel",
        data() {
            return {
                labelList: [],
                labelTable: [
                    {
                        title: '标签值',
                        key: 'intentionOfIndicatorsNum',
                        width: 100
                    },
                    {
                        title: '标签描述',
                        key: 'intentionOfIndicatorsName'
                    },
                    {
                        title: '操作',
                        width: 300,
                        render: (h, param) => {
                            return h('ButtonGroup', {},
                                [
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    path: '/AddLabel',
                                                    query: {code: param.row.intentionOfIndicatorsCode}
                                                })
                                            }
                                        }
                                    }, '修改'),
                                    h('Button', {
                                        props: {
                                            type: 'error'
                                        },
                                        on: {
                                            click: () => {
                                                if (!confirm('确定删除吗?')) return;
                                                this.request('/intentionOfIndicators/delete', {
                                                    ids: param.row.intentionOfIndicatorsCode
                                                }).then(data => {
                                                    if (data.succeed === 1) {
                                                        this.$Message.success('删除成功');
                                                        this.labelList.splice(param.index, 1);
                                                    } else {
                                                        this.$Message.error(data.message);
                                                    }
                                                })
                                            }
                                        }
                                    }, '删除'),
                                ]
                            )
                        }
                    }
                ]
            }
        },
        mounted() {
            this.request('/intentionOfIndicators/query').then(data => {
                this.labelList = data.data;
            })
        },
        methods: {
            setTableStyle(row, index) {
                return row.intentionOfIndicatorsType === 1 ? '' : 'demo-table-error-row'
            }
        }
    }
</script>

<style>
    .ivu-table .demo-table-error-row td {
        background-color: #ff6600;
        color: #fff;
    }
</style>