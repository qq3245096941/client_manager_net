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
                    <FormItem label="员工姓名" prop="realName">
                        <Input v-model="employeeForm.realName"></Input>
                    </FormItem>

                    <FormItem label="员工类型" prop="userType">
                        <Select placeholder="选择人员类型" v-model="employeeForm.userType">
                            <Option value="4">经理</Option>
                            <Option value="3">组长</Option>
                            <Option value="2">员工</Option>
                        </Select>
                    </FormItem>

                    <!--如果是经理，则可选择多个部门-->
                    <FormItem label="选择部门" v-show="employeeForm.userType==='4'">
                        <CheckboxGroup v-model="employeeForm.checkDeptAll">
                            <Checkbox v-for="(dept,index) in deptAll" :label="dept.departmentCode" :kye="index">
                                {{dept.departmentName}}
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>

                    <!--如果是其他职能选择一个部门-->
                    <FormItem label="选择部门" prop="parentCode">
                        <Select placeholder="选择部门" v-model="employeeForm.parentCode">
                            <Option v-for="(dept,index) in deptAll" :value="dept.departmentCode" :key="index">
                                {{dept.departmentName}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="选择角色" prop="userRoleId">
                        <Select placeholder="选择角色" v-model="employeeForm.userRoleId">
                            <Option v-show="role.roleId!==0" v-for="(role,index) in roleAll" :value="role.roleId"
                                    :key="index">{{role.roleName}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="账号" prop="nickName">
                        <Input placeholder="登录账号，必须为手机号" v-model="employeeForm.nickName"></Input>
                    </FormItem>

                    <FormItem label="密码" prop="passWord">
                        <Input placeholder="登录密码" v-model="employeeForm.passWord"></Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="submit('employeeForm')">登录</Button>
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
                    realName: '',
                    userType: '',
                    parentCode: '',
                    userRoleId: '',
                    nickName: '',
                    passWord: '',
                    /*如果选择经理，这里就存放了多个部门*/
                    checkDeptAll: []
                },
                employeeRules: {
                    realName: {
                        required: true,
                        message: '名称不能为空',
                    },
                    userType: {
                        required: true,
                        message: '类型不能为空',
                    },
                    parentCode: {
                        required: true,
                        message: '请选择部门',
                    },
                    userRoleId: {
                        required: true,
                        message: '请选择角色',
                    },
                    nickName: {
                        required: true,
                        message: '请输入账号'
                    },
                    passWord: {
                        required: true,
                        message: '请输入密码'
                    },
                },
                /*所有部门*/
                deptAll: [],
                roleAll: []
            }
        },
        methods: {
            submit(name) {
                if (this.employeeForm.userType === '4' && this.employeeForm.checkDeptAll.length === 0) {
                    this.$Message.error('请至少选择一个部门');
                    return;
                }

                this.$refs[name].validate(valid => {
                    if (valid) {
                        /*如果是经理*/
                        if (this.employeeForm.userType === '4') {
                            Reflect.set(this.employeeForm, 'parentCode', this.employeeForm.checkDeptAll.join(','));
                        }
                        Reflect.deleteProperty(this.employeeForm, 'checkDeptAll');

                        this.request('/sysUser/insert', this.employeeForm, 'post').then(data => {
                            if (data.succeed === 1) {
                                this.$Message.success('添加成功');
                                this.$router.push({path: 'AllEmployee'});
                            } else {
                                this.$Message.error(data.message);
                            }
                        })

                    } else {
                        this.$Message.error('表单错误')
                    }
                })
            }
        },
        mounted() {
            this.request('/department/query').then(data => {
                this.deptAll = data.data;
            });

            this.request('/sysRole/query').then(data => {
                this.roleAll = data.data;
            })
        }
    }
</script>

<style scoped>

</style>