<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>部门管理</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="12">
                <Table :columns="deptTable" :data="deptList"></Table>
            </Col>

            <Col span="12" style="padding: 10px">
                <Alert type="success" show-icon>
                    {{currentEditDeptCode===''?'添加部门':'正在修改'+departForm.departmentName}}
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
                        <ButtonGroup>
                            <Button type="primary" @click="submit('departForm')">
                                {{currentEditDeptCode===''?'添加':'修改'}}
                            </Button>
                            <Button v-show="currentEditDeptCode!==''" @click="cancelEdit">撤销修改</Button>
                        </ButtonGroup>
                    </FormItem>
                </Form>
            </Col>
        </Row>
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
                                            if (!confirm('确定删除吗?')) return;

                                            this.request('/department/delete', {
                                                id: param.row.departmentCode
                                            }).then(data => {
                                                if (data.succeed === 1) {
                                                    this.deptList.splice(param.index, 1);
                                                    this.$Message.success('删除成功');
                                                }else{
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
            /*撤销修改*/
            cancelEdit() {
                this.currentEditDeptCode = '';
                Reflect.set(this.departForm, 'departmentName', '');
                Reflect.set(this.departForm, 'departmentDescribe', '');
                this.request('/department/query').then(data => {
                    this.deptList = data.data;
                })
            },
            submit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        if (this.currentEditDeptCode === '') {
                            /*插入*/
                            this.request('/department/insert', this.departForm, 'post').then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('添加部门成功');
                                    this.cancelEdit();
                                } else {
                                    this.$Message.error(data.message);
                                }
                            })
                        } else {
                            /*修改*/
                            Reflect.set(this.departForm, 'departmentCode', this.currentEditDeptCode);
                            this.request('/department/update', this.departForm, 'post').then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('修改成功');
                                    this.cancelEdit();
                                } else {
                                    this.$Message.success(data.message);
                                }
                            })
                        }
                    } else {
                        this.$Message.error('表单错误，请检查表单');
                    }
                })
            }
        },
        mounted() {
            this.cancelEdit();
        }
    }
</script>

<style scoped>

</style>