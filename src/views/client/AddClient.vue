<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>客户管理</BreadcrumbItem>
                <BreadcrumbItem>添加客服</BreadcrumbItem>
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
                    <FormItem label="地址" prop="address">
                        <Input placeholder="地址尽量详细些" v-model="clientForm.address"></Input>
                    </FormItem>
                    <FormItem label="客户描述">
                        <Input type="textarea" :autosize="{minRows: 4,maxRows: 5}" v-model="clientForm.desc"></Input>
                    </FormItem>
                    <FormItem label="收入">
                        <Input v-model="clientForm.income"></Input>
                    </FormItem>
                    <FormItem label="客户等级" prop="class">
                        <Row>
                            <Col span="12">
                                <Select v-model="clientForm.class">
                                    <Option></Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="合作状态" prop="cooperationState">
                        <Row>
                            <Col span="12">
                                <Select v-model="clientForm.state">
                                    <Option>开发中</Option>
                                    <Option>合作成功</Option>
                                    <Option>合作失败</Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="选择员工" prop="employee">
                        <Row>
                            <Col span="12">
                                <Select v-model="clientForm.employee"></Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <!-- 提交 -->
                    <FormItem>
                        <Button type="primary" @click="submit('clientForm')">提交</Button>
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
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else if (!/^1[34578]\d{9}$/.test(value)) {
                    callback('手机号格式不正确');
                } else {
                    callback();
                }
            };
            return {
                clientForm: {
                    name: '',
                    phone: '',
                    address: '',
                    desc: '',
                    income: '',
                    class: '',
                    state: '',
                    employee: ''
                },
                clientRules: {
                    name: [
                        {
                            required: true,
                            message: '客户名称不能为空',
                            trigger: 'blur'
                        }
                    ],
                    phone: [
                        {
                            required: true,
                            validator: validatePhone,
                        }
                    ],
                    class: [
                        {
                            required: true,
                            message: '客户等级必须选择',
                            trigger: 'blur'
                        }
                    ],
                    cooperationState: [
                        {
                            required: true,
                            message: '合作状态不能为空',
                            trigger: 'blur'
                        }
                    ],
                    employee: [
                        {
                            required: true,
                            message: '请选择员工',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            submit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
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
