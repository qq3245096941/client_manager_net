<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>添加标签</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Alert type="success" v-show="currentCode!==undefined">正在修改：{{labelFrom.intentionOfIndicatorsName}}</Alert>
        <Row>
            <Col span="8">
                <Form :label-width="80" :rules="labelRules" :model="labelFrom" ref="labelFrom">
                    <FormItem label="标签名称" prop="intentionOfIndicatorsName">
                        <Input :disabled="currentCode!==undefined" type="text" v-model="labelFrom.intentionOfIndicatorsName"></Input>
                    </FormItem>
                    <FormItem label="分数" prop="intentionOfIndicatorsNum">
                        <Row>
                            <Col span="12">
                                <Input type="number" v-model="labelFrom.intentionOfIndicatorsNum"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="submit('labelFrom')">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>

    </Card>
</template>

<script>
    export default {
        name: "AddLabel",
        data() {
            return {
                currentCode: '',
                labelFrom: {
                    intentionOfIndicatorsName: '',
                    intentionOfIndicatorsNum: '',
                    state: 1
                },
                labelRules: {
                    intentionOfIndicatorsName: [
                        {
                            message: '标签名不能为空',
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    intentionOfIndicatorsNum: [
                        {
                            message: '分数不能为空',
                            required: true,
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
                        /*判断分数是正数还是负数*/
                        if (this.labelFrom.intentionOfIndicatorsNum >= 0) {
                            Reflect.set(this.labelFrom, 'intentionOfIndicatorsType', 1);
                        } else {
                            Reflect.set(this.labelFrom, 'intentionOfIndicatorsType', 2);
                        }

                        if (this.currentCode === undefined) {
                            Reflect.set(this.labelFrom, 'operatorCode', this.user.userCode);
                            this.request('/intentionOfIndicators/insert', this.labelFrom, 'post').then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('添加成功');
                                    this.$router.push({path: '/AllLabel'});
                                } else {
                                    this.$Message.error(data.message);
                                }
                            })
                        } else {
                            Reflect.set(this.labelFrom, 'intentionOfIndicatorsCode', this.currentCode);
                            Reflect.deleteProperty(this.labelFrom, 'intentionOfIndicatorsName');
                            this.request('/intentionOfIndicators/update', this.labelFrom, 'post').then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('修改成功');
                                    this.$router.push({path: '/AllLabel'});
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
            this.currentCode = this.$route.query.code;

            if (this.currentCode !== undefined) {
                this.request('/intentionOfIndicators/queryOne', {
                    id: this.currentCode
                }).then(data => {
                    console.log(data.data);
                    Reflect.set(this.labelFrom, 'intentionOfIndicatorsName', data.data.intentionOfIndicatorsName);
                    Reflect.set(this.labelFrom, 'intentionOfIndicatorsNum', data.data.intentionOfIndicatorsNum);
                })
            }
        }
    }
</script>

<style scoped>

</style>