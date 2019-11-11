<template>
    <div>
        <Card>
            <clientParticulars :content.sync="modal.clientParticulars"></clientParticulars>
            <addClientLabel :content.sync="modal.addClientLabel"></addClientLabel>

            <p slot="title">
                <Breadcrumb>
                    <BreadcrumbItem>客户管理</BreadcrumbItem>
                    <BreadcrumbItem>所有客户</BreadcrumbItem>
                </Breadcrumb>
            </p>
            <clientSearch @search="searchClient"></clientSearch>
            <!--内容-->
            <Tabs value="name1">
                <TabPane label="开发中" name="name1">
                    <Table :loading="tableLoading" :columns="clientTable" height="520" :data="clientList"></Table>
                </TabPane>
                <TabPane label="已完成" name="name2">已完成</TabPane>
                <TabPane label="已失败" name="name3">已失败</TabPane>
            </Tabs>
            <Divider dashed/>
            <Page :total="pages.total" show-sizer :current.sync="pages.index" :page-size="pages.limit"
                  @on-page-size-change="getLimit"/>
        </Card>
    </div>
</template>
<script>
    import clientSearch from "../../components/clientSearch";
    import clientParticulars from "../../components/modal/client/clientParticulars";
    import addClientLabel from "../../components/modal/client/addClientLabel";

    export default {
        components: {
            clientSearch, clientParticulars, addClientLabel
        },
        data() {
            return {
                /*存储模态框状态数据，false表示不开启*/
                modal: {
                    clientParticulars: {
                        isOpen: false,
                        clientCode: ''
                    },
                    addClientLabel: {
                        isOpen: false,
                        clientCode: ''
                    }
                },
                clientTable: [
                    {
                        title: '姓名',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '电话',
                        key: 'phone',
                        width: 130
                    },
                    {
                        title: '攻略进度',
                        key: 'schedule',
                        width: 200,
                        render: (h, params) => {
                            return h('div', {}, [
                                h('Progress', {
                                    props: {
                                        status: 'active',
                                        percent: params.row.schedule,
                                    },
                                }),
                                h('Button', {
                                    props: {
                                        shape: 'circle',
                                        icon: 'md-add',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            Reflect.set(this.modal.addClientLabel, 'isOpen', true);
                                            Reflect.set(this.modal.addClientLabel, 'clientCode', params.row.clientCode)
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'createTime',
                        width: 150
                    },
                    {
                        title: '最后回访时间',
                        key: 'lastReturnTime',
                        width: 200
                    },
                    {
                        title: "开发人",
                        key: 'sysUserName'
                    },
                    {
                        title: '操作',
                        key: 'option',
                        width: 300,
                        render: (h, params) => {
                            return h('ButtonGroup', {
                                    props: {
                                        type: 'button',
                                        shape: 'circle'
                                    },
                                },
                                [
                                    h('Button',
                                        {
                                            props: {
                                                type: 'success'
                                            },
                                            on: {
                                                click: () => {
                                                    Reflect.set(this.modal.clientParticulars, 'isOpen', true);
                                                    Reflect.set(this.modal.clientParticulars, 'clientCode', params.row.clientCode)
                                                }
                                            }
                                        }, '查看详情'),
                                    h('Button',
                                        {
                                            props: {
                                                type: 'primary'
                                            },
                                            on: {
                                                click: () => {

                                                }
                                            }
                                        }, '修改'),
                                    h('Button',
                                        {
                                            props: {
                                                type: 'warning'
                                            },
                                            click: () => {

                                            }
                                        }, '删除'),
                                ]
                            )
                        }
                    }
                ],
                clientList: [],
                /*分页数据*/
                pages: {
                    /*总条数*/
                    total: 0,
                    index: 1,
                    limit: 10
                },
                /*表格是否加载中*/
                tableLoading: false
            }
        },
        watch: {
            /*监听页码变化*/
            'pages.index':
                {
                    handler() {
                        this.getClientList();
                    }
                }
        },
        methods: {
            /*搜索后返回的数据*/
            searchClient(data) {
                Reflect.set(this.pages, 'total', data.total);
                this.clientList = data.data.map(item => {
                    return this.$store.getters.tidyClient(item);
                });
            },
            getLimit(limit) {
                Reflect.set(this.pages, 'limit', limit);
                this.getClientList();
            },
            /*获取客户列表*/
            getClientList() {
                this.tableLoading = true;
                this.request('/client/query', {
                    page: this.pages.index,
                    limit: this.pages.limit
                }).then(data => {
                    Reflect.set(this.pages, 'total', data.total);
                    this.tableLoading = false;
                    this.clientList = data.data.map(item => {
                        return this.$store.getters.tidyClient(item);
                    });
                });
            }
        },
        mounted() {
            this.getClientList();
        }
    }
</script>

<style scoped>

</style>