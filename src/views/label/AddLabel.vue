<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>添加标签</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="8">
                <Form :label-width="80" :rules="labelRules" :model="labelFrom" ref="labelFrom">
                    <FormItem label="标签名称" prop="name">
                        <Input type="text" v-model="labelFrom.name"></Input>
                    </FormItem>
                    <FormItem label="分数" prop="grade">
                        <Row>
                            <Col span="12">
                                <Input type="number" v-model="labelFrom.grade"></Input>
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
                labelFrom: {
                    name: '',
                    grade: ''
                },
                labelRules: {
                    name: [
                        {
                            message: '标签名不能为空',
                            required: true,
                            trigger: 'blur'
                        }
                    ],
                    grade: [
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
                    console.log(valid);
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