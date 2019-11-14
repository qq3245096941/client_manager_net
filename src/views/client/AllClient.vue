<template>
    <div>
        <Card>
            <clientParticulars :content.sync="modal.clientParticulars"></clientParticulars>
            <addClientLabel :content.sync="modal.addClientLabel"></addClientLabel>
            <allotEmployee :content.sync="modal.allotEmployee"></allotEmployee>
            <!--添加跟进弹框-->
            <addFollow :content.sync="modal.addFollow"></addFollow>

            <p slot="title">
                <Breadcrumb>
                    <BreadcrumbItem>客户管理</BreadcrumbItem>
                    <BreadcrumbItem>所有客户</BreadcrumbItem>
                </Breadcrumb>
            </p>
            <clientSearch ref="clientSearch" @search="searchClient"></clientSearch>

            <Table :row-class-name="rowClassName" :loading="tableLoading" :columns="clientTable" height="520"
                   :data="clientList"></Table>

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
    import allotEmployee from "../../components/modal/client/allotEmployee";
    import addFollow from "../../components/modal/client/addFollow";

    export default {
        components: {
            clientSearch, clientParticulars, addClientLabel, allotEmployee, addFollow
        },
        data() {
            return {
                /*存储模态框状态数据，false表示不开启*/
                modal: {
                    clientParticulars: {
                        isOpen: false,
                        clientCode: ''
                    },
                    /*添加标签弹框*/
                    addClientLabel: {
                        isOpen: false,
                        clientCode: ''
                    },
                    /*分配员工弹框*/
                    allotEmployee: {
                        isOpen: false,
                        clientCode: ''
                    },
                    /*添加跟进弹框*/
                    addFollow: {
                        isOpen: false,
                        clientCode: ''
                    }
                },
                clientTable: [
                    {
                        title: '开发状态',
                        key: 'cooperationStatus',
                        width: 100
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '微信号',
                        key: 'wxNum',
                        width: 130
                    },
                    {
                        title: '攻略进度',
                        key: 'schedule',
                        sortable: true,
                        width: 200,
                        render: (h, params) => {
                            return h('div', {}, [
                                h('Progress', {
                                    props: {
                                        status: 'active',
                                        percent: this.getClientPercent(params.row.schedule),
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
                        title: '等级',
                        key: 'lvName',
                        width: 100
                    },
                    {
                        title: '添加时间',
                        key: 'createTime',
                        sortable: true,
                        width: 150
                    },
                    {
                        title: '最后跟进时间',
                        key: 'lastReturnTime',
                        width: 200
                    },
                    {
                        title: "开发人",
                        key: 'sysUserName',
                        width: 100
                    },
                    {
                        title: '操作',
                        key: 'option',
                        fixed: 'right',
                        width: 280,
                        render: (h, params) => {
                            return h('ButtonGroup', {
                                    props: {
                                        type: 'button',
                                        shape: 'circle',
                                        size: 'small'
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
                                    /*添加跟进*/
                                    h('Button',
                                        {
                                            props: {
                                                type: 'warning'
                                            },
                                            style: {
                                                display: this.user.userType === 3 || this.user.userType === 2 ? 'block' : 'none'
                                            },
                                            on: {
                                                click: () => {
                                                    Reflect.set(this.modal.addFollow, 'isOpen', true);
                                                    Reflect.set(this.modal.addFollow, 'clientCode', params.row.clientCode)
                                                }
                                            }
                                        }, '添加跟进'),
                                    h('Button',
                                        {
                                            props: {
                                                type: 'primary'
                                            },
                                            style: {
                                                display: this.user.userType !== 1 ? 'inline' : 'none'
                                            },
                                            on: {
                                                click: () => {
                                                    this.$router.push({
                                                        path: 'AddClient',
                                                        query: {code: params.row.clientCode}
                                                    })
                                                }
                                            }
                                        }, '修改'),
                                    h('Button',
                                        {
                                            props: {
                                                type: 'primary',
                                            },
                                            style: {
                                                display: this.user.userType === 1 ? 'inline' : 'none'
                                            },
                                            on: {
                                                click: () => {
                                                    Reflect.set(this.modal.allotEmployee, 'isOpen', true);
                                                    Reflect.set(this.modal.allotEmployee, 'clientCode', params.row.clientCode)
                                                }
                                            }
                                        }, '分配员工'),
                                    h('Button',
                                        {
                                            props: {
                                                type: 'error'
                                            },
                                            style: {
                                                display: this.user.userType !== 1 ? 'inline' : 'none'
                                            },
                                            on: {
                                                click: () => {
                                                    if (!confirm('确定删除吗?')) return;

                                                    this.request('/client/update', {
                                                        clientCode: params.row.clientCode,
                                                        cooperationStatus: 4
                                                    }).then(data => {
                                                        if (data.succeed === 1) {
                                                            this.$Message.success('删除成功');
                                                            this.clientList.splice(params.index, 1);
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
            /*通过开发状态，给表格每行设置颜色*/
            rowClassName(row, index) {
                if (row.cooperationStatus === '开发中') {
                    return 'table-info-row';
                }

                if (row.cooperationStatus === '合作成功') {
                    return 'table-success-row';
                }

                return 'table-error-row';

            },
            /*计算客户的进度*/
            getClientPercent(schedule) {
                if (schedule > 100) {
                    return 100;
                }
                if (schedule < 0) {
                    return 0;
                }
                return schedule;
            },
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

                let obj = {
                    page: this.pages.index,
                    limit: this.pages.limit,
                };

                switch (this.user.userType) {
                    case 2:
                        Reflect.set(obj, 'departmentCode', this.user.parentCode);
                        break;
                    case 3:
                        Reflect.set(obj, 'sysUserCode', this.user.userCode);
                        break;
                    case 4:
                        Reflect.set(obj, 'userType', 4);
                        Reflect.set(obj, 'bossId', this.user.userCode);
                        break;
                }

                this.request('/client/query', obj).then(data => {
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
    .ivu-table .table-success-row td {
        background-color: #19be6b;
        color: #fff;
    }

    .ivu-table .table-info-row td {
        background-color: #ff9900;
        color: #fff;
    }

    .ivu-table .table-error-row td {
        background-color: #ed4014;
        color: #fff;
    }
</style>