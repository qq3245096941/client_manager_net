<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>部门管理</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Tabs type="card">
            <TabPane label="所有部门">
                <Table :columns="deptTable" :data="data1"></Table>
            </TabPane>
            <TabPane label="添加部门">
                <Row>
                    <Col span="12">
                        <Form :model="departForm" :label-width="80" ref="departForm" :rules="departRules">
                            <FormItem label="部门名称" prop="name">
                                <Input v-model="departForm.name"></Input>
                            </FormItem>
                            <FormItem label="部门描述" prop="desc">
                                <Input type="textarea" :autosize="{minRows: 5,maxRows: 8}"
                                       v-model="departForm.desc"></Input>
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
                departForm: {
                    name: '',
                    desc: ''
                },
                departRules: {
                    name: [
                        {
                            required: true,
                            message: '请输入名称',
                            trigger: 'blur'
                        },
                    ],
                    desc: [
                        {
                            required: true,
                            message: '请输入部门描述',
                            trigger: 'blur'
                        },
                    ]
                },
                /*部门表*/
                deptTable:[
                    {
                        title: '部门名称',
                        key: 'name'
                    },
                    {
                        title: '部门描述',
                        key: 'desc'
                    },
                    {
                        title:'操作',
                        render(h,param){
                            /*return h('Button',{

                            },'')*/
                        }
                    }
                ]
            }
        },
        methods: {
            submit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                    } else {
                        this.$Message.error('表单错误，请检查表单');
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>