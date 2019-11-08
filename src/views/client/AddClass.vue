<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>客户管理</BreadcrumbItem>
                <BreadcrumbItem>添加等级</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Row>
            <Col span="8">
                <Form :label-width="80" :model="classForm" ref="classForm" :rules="classRules">
                    <FormItem label="等级名称" prop="lvName">
                        <Input v-model="classForm.lvName"></Input>
                    </FormItem>
                    <FormItem label="等级描述" prop="lvRemarks">
                        <Input type="textarea" v-model="classForm.lvRemarks"
                               :autosize="{minRows: 5,maxRows: 8}"></Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="classSubmit('classForm')">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "AddClass",
        data() {
            return {
                classForm: {
                    lvName: '',
                    lvRemarks: ''
                },
                classRules: {
                    lvName: {
                        message: '等级名称不能为空',
                        required: true,
                    },
                    lvRemarks: {
                        message: '等级描述不能为空',
                        required: true
                    }
                },
                code: ''
            }
        },
        methods: {
            classSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        /*新增*/
                        if (this.code === undefined) {
                            this.request('/lv/insert', this.classForm).then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('新增成功');
                                    this.$router.push({path: '/AllClass'});
                                    return;
                                }

                                this.$Message.error(data.message);
                            })
                        } else {
                            /*修改*/
                            Reflect.set(this.classForm, 'lvCode', this.code);
                            this.request('/lv/update', this.classForm).then(data => {
                                if (data.succeed === 1) {
                                    this.$Message.success('修改成功');
                                    this.$router.push({path: '/AllClass'});
                                    return;
                                }
                                this.$Message.error(data.message);
                            })
                        }
                    } else {
                        this.$Message.error('表单错误，请检查表单');
                    }
                })
            }
        },
        mounted() {
            this.code = this.$route.query.code;

            if (this.code !== undefined) {
                this.request('/lv/queryOne', {
                    id: this.code
                }).then(data => {
                    Reflect.set(this.classForm, 'lvName', data.data.lvName);
                    Reflect.set(this.classForm, 'lvRemarks', data.data.lvRemarks);
                })
            }
        }
    }
</script>

<style scoped>

</style>