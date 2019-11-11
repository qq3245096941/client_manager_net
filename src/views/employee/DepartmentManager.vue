<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>部门管理</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Tabs type="card" :value="currentEditDeptCode===''?'all':'edit'">
            <TabPane label="所有部门" name="all">
                <Table :columns="deptTable" :data="deptList"></Table>
            </TabPane>
            <TabPane label="添加部门" name="edit">
                <Row>
                    <Col span="12">
                        <Alert v-show="currentEditDeptCode!==''" type="success" show-icon>
                            正在修改{{departForm.departmentName}}
                        </Alert>
                        <Form :model="departForm" :label-width="80" ref="departForm" :rules="departRules">
                            <FormItem label="部门名称" prop="departmentName">
                                <Input v-model="departForm.departmentName"></Input>
                            </FormItem>
                            <FormItem label="部门描述" prop="departmentDescribe">
                                <Input type="textarea" :autosize="{minRows: 5,maxRows: 8}"
                                       v-model="departForm.departmentDescribe"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit('departForm')">提交</Button>
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
        name: "departmentManager",
        data() {
            return {
                /*当前正在修改的部门code*/
                currentEditDeptCode: '',
                departForm: {
                    departmentName: '',
                    departmentDescribe: ''
                },
                departRules: {
                    departmentName: [
                        {
                            required: true,
                            message: '请输入名称',
                            trigger: 'blur'
                        },
                    ],
                    departmentDescribe: [
                        {
                            required: true,
                            message: '请输入部门描述',
                            trigger: 'blur'
                        },
                    ]
                },
                deptList: [],
                deptTable: [
                    {
                        title: '部门名称',
                        key: 'departmentName',
                        width: 150
                    },
                    {
                        title: '部门描述',
                        key: 'departmentDescribe'
                    },
                    {
                        title: '操作',
                        width: 250,
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
                                            this.currentEditDeptCode = param.row.departmentCode;
                                            Reflect.set(this.departForm, 'departmentName', param.row.departmentName);
                                            Reflect.set(this.departForm, 'departmentDescribe', param.row.departmentDescribe);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error'
                                    },
                                    on: {
                                        click: () => {
                                            this.request('/department/delete', {
                                                id: param.row.departmentCode
                                            }).then(data => {
                                                if (data.succeed === 1) {
                                                    this.deptList.splice(param.index, 1);
                                                    this.$Message.success('删除成功');
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
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        if (this.currentEditDeptCode === '') {
                            this.request('/department/insert', this.departForm, 'post').then(data => {
                                if (data.succeed === 1) {
                                    window.location.reload();
                                    this.$Message.success('添加部门成功');
                                } else {
                                    this.$Message.error(data.message);
                                }
                            })
                        } else {
                            Reflect.set(this.departForm, 'departmentCode', this.currentEditDeptCode);
                            this.request('/department/update', this.departForm, 'post').then(data => {
                                window.location.reload();
                                this.$Message.success('修改成功');
                            })
                        }
                    } else {
                        this.$Message.error('表单错误，请检查表单');
                    }
                })
            }
        },
        mounted() {
            this.request('/department/query').then(data => {
                this.deptList = data.data;
            })
        }
    }
</script>

<style scoped>

</style>