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
                            <Option :value="4">经理</Option>
                            <Option :value="2">组长</Option>
                            <Option :value="3">员工</Option>
                        </Select>
                    </FormItem>

                    <!--如果是经理，则可选择多个部门-->
                    <FormItem label="选择部门" v-show="employeeForm.userType===4">
                        <CheckboxGroup v-model="employeeForm.checkDeptAll">
                            <Tooltip v-for="(dept,index) in deptAll" content="该部门已有相关人员管辖" placement="top-start"
                                     :disabled="dept.status===1">
                                <Checkbox :disabled="dept.status===2" :label="dept.departmentCode" :kye="index">
                                    {{dept.departmentName}}
                                </Checkbox>
                            </Tooltip>
                        </CheckboxGroup>
                    </FormItem>

                    <!--如果是其他职能选择一个部门-->
                    <FormItem label="选择部门" :prop="employeeForm.userType===2?'parentCode':''"
                              v-show="employeeForm.userType===2">
                        <Select placeholder="选择部门" v-model="employeeForm.parentCode">
                            <Option v-for="(dept,index) in deptAll" :value="dept.departmentCode" :key="index">
                                {{dept.departmentName}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="选择角色" prop="userRoleId">
                        <Select placeholder="选择角色" v-model="employeeForm.userRoleId">
                            <Option v-show="role.roleId!==0" v-for="(role,index) in roleAll" :value="role.roleId+''"
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
                        <Button type="primary" @click="submit('employeeForm')">提交</Button>
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
        watch: {
            'employeeForm.userType': {
                async handler(val) {
                    let obj = {
                        type: 2
                    };

                    if(this.$route.query.code!==undefined){
                        Reflect.set(obj,'sysUserCode',this.$route.query.code);
                    }

                    if (val === 4) {
                        this.request('/department/query', obj).then(data => {
                            this.deptAll = data.data;
                        });
                    }
                }
            }
        },
        methods: {
            submit(name) {
                if (this.employeeForm.userType === 4 && this.employeeForm.checkDeptAll.length === 0) {
                    this.$Message.error('请至少选择一个部门');
                    return;
                }

                this.$refs[name].validate(valid => {
                    if (valid) {
                        /*如果是经理*/
                        if (this.employeeForm.userType === 4) {
                            Reflect.set(this.employeeForm, 'parentCode', this.employeeForm.checkDeptAll.join(','));
                        }
                        Reflect.deleteProperty(this.employeeForm, 'checkDeptAll');

                        /*判断是插入还是更新*/
                        if(this.$route.query.code===undefined){
                            this.request('/sysUser/insert', this.employeeForm, 'post').then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('添加成功');
                                    this.$router.push({path: '/AllEmployee'});
                                } else {
                                    this.$Message.error(data.message);
                                }
                            })
                        }else{
                            Reflect.set(this.employeeForm,'userCode',this.$route.query.code);
                            this.request('/sysUser/update', this.employeeForm, 'post').then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('修改成功');
                                    this.$router.push({path: '/AllEmployee'});
                                } else {
                                    this.$Message.error(data.message);
                                }
                            })
                        }
                    } else {
                        this.$Message.error('表单错误')
                    }
                })
            }
        },
        mounted() {
            if (this.$route.query.code !== undefined) {
                this.request('/sysUser/queryOne', {id: this.$route.query.code}).then(data => {
                    const employee = data.data;
                    if (employee.userType === 4) {
                        this.employeeForm.checkDeptAll = employee.parentCode.split(',');
                    }
                    Reflect.ownKeys(employee).forEach(key => {
                        if (Reflect.has(this.employeeForm, key)) {
                            Reflect.set(this.employeeForm, key, Reflect.get(employee, key));
                        }
                    });
                })
            }

            /*获取所有部门*/
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