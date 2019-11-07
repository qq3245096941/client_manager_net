<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>添加员工</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="8">
                <Form :label-width="80" :model="employeeForm" ref="employeeForm" :rules="employeeRules">
                    <FormItem label="员工姓名" prop="name">
                        <Input v-model="employeeForm.name"></Input>
                    </FormItem>
                    <FormItem label="员工类型" prop="type">
                        <Select placeholder="选择人员类型" v-model="employeeForm.type">
                            <Option value="beijing">经理</Option>
                            <Option value="shanghai">员工</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="选择部门" prop="department">
                        <Select placeholder="选择部门" v-model="employeeForm.department">
                            <Option value="beijing">经理</Option>
                            <Option value="shanghai">员工</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="选择角色" prop="role">
                        <Select placeholder="选择角色" v-model="employeeForm.role">
                            <Option value="beijing">经理</Option>
                            <Option value="shanghai">员工</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="账号" prop="username">
                        <Input placeholder="登录账号，必须为手机号" v-model="employeeForm.username"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input placeholder="登录密码" v-model="employeeForm.password"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary">登录</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "AddEmployee",
        data() {
            return {
                employeeForm: {
                    name: '',
                    type: '',
                    department: '',
                    role: '',
                    username: '',
                    password: ''
                },
                employeeRules: {
                    name: {
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    },
                    type: {
                        required: true,
                        message:'类型不能为空',
                        trigger: 'blur'
                    },
                    department:{
                        required: true,
                        message:'请选择部门',
                        trigger: 'blur'
                    },
                    role:{
                        required: true,
                        message:'请选择角色',
                        trigger: 'blur'
                    },
                    username:{

                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>