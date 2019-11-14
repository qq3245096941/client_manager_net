<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>所有角色</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Row>
            <Col span="12">
                <Table :columns="columns" :data="allRoleList"></Table>
            </Col>
            <Col span="12" style="padding: 10px">
                <Alert v-show="currentRole!==''">正在修改角色：{{roleForm.roleName}}</Alert>
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
                        <ButtonGroup>
                            <Button type="primary" @click="submit('roleForm')">{{currentRole===''?'添加':'修改'}}</Button>
                            <Button @click="cancelEdit" v-show="currentRole!==''">撤销修改</Button>
                        </ButtonGroup>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "RoleManager",
        data() {
            return {
                /*当前正在修改的角色*/
                currentRole: '',
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
                                    },
                                    on: {
                                        click: () => {
                                            this.currentRole = param.row.roleId;
                                            Reflect.set(this.roleForm, 'roleName', param.row.roleName);
                                            Reflect.set(this.roleForm, 'roleDesc', param.row.roleDesc);

                                            /*获取当前角色的菜单栏*/
                                            this.request('/sysRole/queryOne', {
                                                id: this.currentRole
                                            }).then(data => {
                                                this.getRoleList(data.data.menuCodes.split(','));
                                            });


                                        }
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
                let menuCodes = this.$refs['tree'].getCheckedAndIndeterminateNodes().map(item => {
                    return item.code
                }).join(',');

                console.log(menuCodes);

                Reflect.set(this.roleForm, 'menuCodes', menuCodes);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        /*添加或修改*/
                        if(this.currentRole===''){
                            this.request('/sysRole/insert', this.roleForm, 'post').then(data => {
                                this.$Message.success('添加角色成功');
                                this.cancelEdit();
                            })
                        }else{
                            Reflect.set(this.roleForm,'roleId',this.currentRole);
                            this.request('/sysRole/update',this.roleForm,'post').then(data=>{
                                this.$Message.success('修改角色成功');
                                this.cancelEdit();
                            })
                        }

                    } else {
                        this.$Message.error('表单错误，请检查表单');
                    }
                })
            },
            /*撤销删除*/
            cancelEdit() {
                this.currentRole = '';
                Reflect.set(this.roleForm, 'roleName', '');
                Reflect.set(this.roleForm, 'roleDesc', '');
                /*获取所有角色*/
                this.request('/sysRole/query').then(data => {
                    this.allRoleList = data.data;
                });

                this.getRoleList();
            },
            async getRoleList(currentRoleList = []) {
                currentRoleList = currentRoleList.map(item => {
                    return Number.parseInt(item);
                });
                this.request('/sysMenu/userQuery').then(data => {
                    this.roleList = [];
                    const roleList = data.data;

                    roleList.forEach((item,index) => {
                        let parentObj = {};
                        let childrenList = [];

                        item.sonList.forEach(child => {
                            let childrenObj = {};
                            Reflect.set(childrenObj, 'title', child.menuName);
                            Reflect.set(childrenObj, 'code', child.menuCode);
                            Reflect.set(childrenObj, 'expand', true);

                            if (currentRoleList.includes(child.menuCode)) {
                                Reflect.set(childrenObj, 'checked', true)
                            }
                            childrenList.push(childrenObj);
                        });

                        Reflect.set(parentObj, 'title', item.menuName);
                        Reflect.set(parentObj, 'children', childrenList);
                        Reflect.set(parentObj, 'code', item.menuCode);

                        if(currentRoleList.length>0){
                            Reflect.set(parentObj, 'expand', true);
                        }

                        this.roleList.push(parentObj);
                    });
                })
            }
        },
        mounted() {
            this.getRoleList();
            this.cancelEdit();
        }
    }
</script>

<style scoped>

</style>