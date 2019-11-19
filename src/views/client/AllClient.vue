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
            <Alert type="warning" v-show="user.userType!==1&&currentGroupTask.length>0">
                本周任务：<br>
                <template v-for="(task,index) in currentGroupTask">
                    {{task.deptName}}目标微信量：
                    <Tag checkable color="error">{{task.rwWXNum}}</Tag>
                    ， 已完成微信量
                    <Tag checkable color="success">{{task.WXNum}}</Tag>
                    <br>
                </template>
            </Alert>
            <Alert type="error" v-show="currentGroupTask.length===0&&user.userType!==1">本周暂未分配任务</Alert>

            <clientSearch ref="clientSearch" @search="searchClient" :page.sync="clientPage"></clientSearch>

            <Table @on-sort-change="clientSort" size="large" :row-class-name="rowClassName" :loading="tableLoading"
                   :columns="clientTable" height="680"
                   :data="clientList"></Table>

            <Page :total="clientPage.total" @on-change="changePage" @on-page-size-change="pageSizeChange"
                  :current.sync="clientPage.page" show-sizer/>
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
                        title: '意向度',
                        key: 'schedule',
                        sortable: 'custom',
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
                        width: 170
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
                                                type: 'warning'
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
                                                display: this.user.userType === 2 || this.user.userType === 4 ? 'inline' : 'none'
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
                /*客户列表*/
                clientList: [],
                /*表格是否加载中*/
                tableLoading: false,
                /*组任务情况，如果是经理，则有多个组*/
                currentGroupTask: [],
                /*分页*/
                clientPage: {
                    total: 0,
                    page: 1,
                    limit: 10,
                    /*1：时间升序，2：时间降序，3：进度升序，4：进度降序*/
                    sort: ''
                },
                /*是否是搜索得到的数据*/
                isSearchClient: false
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
            /*客户排序*/
            clientSort(data) {
                switch (data.key) {
                    case 'createTime':
                        if (data.order === 'desc') {
                            Reflect.set(this.clientPage, 'sort', 2);
                        } else {
                            Reflect.set(this.clientPage, 'sort', 1);
                        }
                        break;
                    case 'schedule':
                        if (data.order === 'desc') {
                            Reflect.set(this.clientPage, 'sort', 4);
                        } else {
                            Reflect.set(this.clientPage, 'sort', 3);
                        }
                        break;
                }
                this.getClientList();
            },
            /*监听页码变化*/
            changePage(page) {
                Reflect.set(this.clientPage, 'page', page);
                this.getClientList();
            },
            pageSizeChange(pageSize) {
                Reflect.set(this.clientPage, 'limit', pageSize);
                this.getClientList();
            },
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
                /*将表格数据标记为搜索得到的数据，方便后续分页和排序做铺垫*/
                this.isSearchClient = true;

                Reflect.set(this.clientPage, 'total', data.total);
                this.clientList = data.data.map(item => {
                    return this.$store.getters.tidyClient(item);
                });
            },
            /*获取客户列表*/
            getClientList() {
                this.tableLoading = true;

                /*判断是否是搜索得到的数据，如果是则直接调用搜索组件的确定搜索方法，抛弃下面常规方式*/
                if (this.isSearchClient) {
                    this.tableLoading = false;
                    this.$refs.clientSearch.search();
                    this.clientPage.page = 1;
                    return;
                }

                let obj = {
                    page: this.clientPage.page,
                    limit: this.clientPage.limit,
                    showType: this.clientPage.sort
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
                    Reflect.set(this.clientPage, 'total', data.total); //总条数
                    this.tableLoading = false;
                    this.clientList = data.data.map(item => {
                        return this.$store.getters.tidyClient(item);
                    });
                });
            },
            async getGroupsTask() {
                /*获取员工所在本组的任务情况，经理有多个组的情况*/
                switch (this.user.userType) {
                    case 2:
                    case 3:
                        let obj = {};
                        let dept = (await this.request('/department/queryOne', {id: this.user.parentCode})).data;
                        let task = (await this.request('/mission/week', {
                            id: this.user.parentCode,
                            type: 2,
                            weekType: 2
                        })).data;
                        Reflect.set(obj, 'deptName', dept.departmentName);
                        Reflect.set(obj, 'rwWXNum', task.rwWXNum);
                        Reflect.set(obj, 'WXNum', task.WXNum);
                        this.currentGroupTask.push(obj);
                        break;
                    case 4:
                        let deptList = this.user.parentCode.split(',');
                        deptList.forEach(item => {
                            let obj = {};
                            this.request('/department/queryOne', {id: item}).then(data => {
                                Reflect.set(obj, 'deptName', data.data.departmentName);
                            });
                            this.request('/mission/week', {
                                id: item,
                                type: 2,
                                weekType: 2
                            }).then(data => {
                                Reflect.set(obj, 'rwWXNum', data.data.rwWXNum);
                                Reflect.set(obj, 'WXNum', data.data.WXNum);
                                this.currentGroupTask.push(obj);
                            });
                        });
                        break;
                }
            }
        },
        mounted() {
            this.getClientList();
            /*获取组的任务情况*/
            this.getGroupsTask();
        }
    }
</script>

<style>
    .ivu-table .table-success-row td {
        background-color: #19be6b;
        color: #fff;
    }

    .ivu-table .table-info-row td {
        background-color: #fff;
    }

    .ivu-table .table-error-row td {
        background-color: #ed4014;
        color: #fff;
    }
</style>