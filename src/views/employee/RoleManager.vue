<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>所有角色</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Tabs type="card">
            <TabPane label="所有角色">
                <Table :columns="columns" :data="allRoleList"></Table>
            </TabPane>
            <TabPane label="添加角色">
                <Row>
                    <Col span="8">
                        <Form :label-width="80" :model="roleForm" ref="roleForm" :rules="roleRule">
                            <FormItem label="角色名称" prop="roleName">
                                <Input v-model="roleForm.roleName"></Input>
                            </FormItem>

                            <FormItem label="角色描述" prop="roleDesc">
                                <Input v-model="roleForm.roleDesc" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"></Input>
                            </FormItem>

                            <FormItem label="权限">
                                <Tree ref="tree" :data="roleList" show-checkbox></Tree>
                            </FormItem>

                            <FormItem>
                                <Button type="primary" @click="submit('roleForm')">提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    export default {
        name: "RoleManager",
        data() {
            return {
                /*权限列表*/
                roleList: [],
                roleForm: {
                    roleName: '',
                    roleDesc: ''
                },
                roleRule: {
                    roleName: [
                        {
                            required: true,
                            message: '角色名称不能为空'
                        }
                    ],
                    roleDesc: [
                        {
                            required: true,
                            message: '角色描述不能为空'
                        }
                    ]
                },
                /*所有角色*/
                allRoleList: [],
                columns: [
                    {
                        title: '姓名',
                        key: 'roleName',
                        width: 100
                    },
                    {
                        title: '描述',
                        key: 'roleDesc'
                    },
                    {
                        title: '操作',
                        width: 200,
                        render: (h, param) => {
                            return h('ButtonGroup', {
                                props: {
                                    shape: 'circle'
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'success'
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                    },
                                    on: {
                                        click: () => {
                                            if (!confirm('确定删除吗?')) return;
                                            this.request('/sysRole/delete', {
                                                ids: param.row.roleId
                                            }).then(data => {
                                                if (data.succeed === 1) {
                                                    this.$Message.success(data.message);
                                                    this.allRoleList.splice(param.index, 1);
                                                } else {
                                                    this.$Message.error(data.message);
                                                }
                                            })
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ]
            }
        },
        methods: {
            submit(name) {
                let menuCodes = this.$refs['tree'].getCheckedNodes().map(item => {
                    return item.code
                }).join(',');

                Reflect.set(this.roleForm, 'menuCodes', menuCodes);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('/sysRole/insert', this.roleForm, 'post').then(data => {
                            this.$Message.success('添加角色成功');
                            window.location.reload();
                        })
                    } else {
                        this.$Message.error('表单错误，请检查表单');
                    }
                })
            },
            getRoleList() {
                this.request('/sysMenu/userQuery').then(data => {
                    const roleList = data.data;

                    roleList.forEach(item => {
                        let parentObj = {};
                        let childrenList = [];

                        item.sonList.forEach(child => {
                            let childrenObj = {};
                            Reflect.set(childrenObj, 'title', child.menuName);
                            Reflect.set(childrenObj, 'code', child.menuCode);
                            Reflect.set(childrenObj, 'expand', true);
                            childrenList.push(childrenObj);
                        });

                        Reflect.set(parentObj, 'title', item.menuName);
                        Reflect.set(parentObj, 'children', childrenList);
                        Reflect.set(parentObj, 'code', item.menuCode);
                        Reflect.set(parentObj, 'expand', true);

                        this.roleList.push(parentObj)
                    });
                })
            }
        },
        mounted() {
            this.getRoleList();
            /*获取所有角色*/
            this.request('/sysRole/query').then(data => {
                this.allRoleList = data.data;
            })
        }
    }
</script>

<style scoped>

</style>