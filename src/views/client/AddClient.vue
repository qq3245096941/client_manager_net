<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>客户管理</BreadcrumbItem>
                <BreadcrumbItem>添加客户</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="12">
                <Form ref="clientForm" :label-width="80" :model="clientForm" :rules="clientRules">
                    <FormItem label="客户名称" prop="name">
                        <Input v-model="clientForm.name"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="phone">
                        <Row>
                            <Col span="12">
                                <Input placeholder="手机号码" v-model="clientForm.phone"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="微信号" prop="wxNum">
                        <Row>
                            <Col span="12">
                                <Input placeholder="微信号" v-model="clientForm.wxNum"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input placeholder="地址尽量详细些" v-model="clientForm.address"></Input>
                    </FormItem>
                    <FormItem label="资产评估">
                        <Input v-model="clientForm.property"></Input>
                    </FormItem>
                    <FormItem label="客户等级" prop="lvCode">
                        <Row>
                            <Col span="12">
                                <Select v-model="clientForm.lvCode">
                                    <Option v-for="(lv,index) in lvList" :value="lv.lvCode" :key="index">{{lv.lvName}}
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="合作状态" prop="cooperationStatus">
                        <Row>
                            <Col span="12">
                                <Select v-model="clientForm.cooperationStatus">
                                    <Option value="2">开发中</Option>
                                    <Option value="1">合作成功</Option>
                                    <Option value="3">合作失败</Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <!--合作金额-->
                    <FormItem label="合作金额" v-show="clientForm.cooperationStatus==='1'">
                        <Row>
                            <Col span="12">
                                <Input v-model="clientForm.amountOfCooperation">
                                    <span slot="append">万</span>
                                </Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="选择员工" :prop="user.userType===3?'':'sysUserCode'" v-show="user.userType!==3">
                        <Row>
                            <Col span="12">
                                <Select v-model="clientForm.sysUserCode">
                                    <Option v-show="employee.userType!==4" v-for="(employee,index) in employeeList"
                                            :key="index"
                                            :value="employee.userCode">
                                        {{employee.realName}}
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="描述">
                        <Input type="textarea" :autosize="{minRows: 4,maxRows: 5}"
                               v-model="clientForm.work"></Input>
                    </FormItem>
                    <!-- 提交 -->
                    <FormItem>
                        <Button :disabled="isDisabledButton" type="primary" @click="submit('clientForm')">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "AddClient",
        data() {
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback();
                }
                if (!/^1[34578]\d{9}$/.test(value)) {
                    callback('手机号格式不正确');
                } else {
                    callback();
                }
            };
            return {
                clientForm: {
                    name: '',
                    phone: '',
                    wxNum: '',
                    address: '',
                    work: '',
                    lvCode: '',
                    cooperationStatus: '',
                    sysUserCode: '',
                    property: '',
                    /*选择合作成功时，可做的金额*/
                    amountOfCooperation: ''
                },
                isDisabledButton:false,
                clientRules: {
                    name: {
                        required: true,
                        message: '客户名称不能为空',
                        trigger: 'blur'
                    },
                    phone: {
                        validator: validatePhone,
                        trigger: 'blur'
                    },
                    wxNum: {
                        required: true,
                        message: '请输入微信号',
                        trigger: 'blur'
                    },
                    address: {
                        required: true,
                        message: '地址必须填写',
                        trigger: 'blur'
                    },
                    lvCode: {
                        required: true,
                        message: '客户等级必须选择',
                        trigger: 'blur'
                    },
                    cooperationStatus: {
                        required: true,
                        message: '合作状态必须选择',
                        trigger: 'blur'
                    },
                    sysUserCode: {
                        required: true,
                        message: '请选择员工',
                        trigger: 'blur'
                    }
                },
                /*部门列表*/
                deptList: [],
                /*等级列表*/
                lvList: [],
                /*员工列表*/
                employeeList: []
            }
        },
        methods: {
            submit(name) {
                this.isDisabledButton = true;
                if(this.clientForm.cooperationStatus==='1'&&this.clientForm.amountOfCooperation===''){
                    this.$Message.error('必须填写合作金额');
                    this.isDisabledButton = false;
                    return;
                }

                Reflect.set(this.clientForm, 'sysUserCode', this.user.userCode);

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.$route.query.code === undefined) {

                            Reflect.set(this.clientForm, 'departmentCode', this.user.parentCode);
                            this.request('/client/insert', this.clientForm).then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('添加成功');
                                    this.$router.push({path: '/AllClient'});
                                } else {
                                    this.$Message.error(data.message);
                                }

                            })
                        } else {
                            Reflect.set(this.clientForm, 'clientCode', this.$route.query.code);
                            this.request('/client/update', this.clientForm, 'post').then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('修改成功');
                                    this.$router.push({path: '/AllClient'});
                                } else {
                                    this.$Message.error(data.message);
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
            if (this.$route.query.code !== undefined) {
                this.request('/client/queryOne', {
                    id: this.$route.query.code
                }).then(data => {
                    Reflect.ownKeys(data.data).forEach(key => {
                        if (Reflect.has(this.clientForm, key)) {
                            Reflect.set(this.clientForm, key, Reflect.get(data.data, key));
                        }
                    });

                    this.clientForm.cooperationStatus = this.clientForm.cooperationStatus + '';
                })
            }

            this.request('/department/query').then(data => {
                this.deptList = data.data;
            });

            this.request('/lv/query').then(data => {
                this.lvList = data.data;
            });

            /*当前部门的员工*/
            this.request('/sysUser/query', {
                parentCode: this.user.parentCode,
            }).then(data => {
                this.employeeList = data.data;
            })
        }
    }
</script>

<style scoped>

</style>
