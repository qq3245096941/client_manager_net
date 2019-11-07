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
                    <FormItem label="等级名称" prop="name">
                        <Input v-model="classForm.name"></Input>
                    </FormItem>
                    <FormItem label="等级描述" prop="desc">
                        <Input type="textarea" v-model="classForm.desc" :autosize="{minRows: 5,maxRows: 8}"></Input>
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
                    name: '',
                    desc: ''
                },
                classRules:{
                    name:{
                        message:'等级名称不能为空',
                        required:true,
                    },
                    desc:{
                        message:'等级描述不能为空',
                        required:true
                    }
                }
            }
        },
        methods:{
            classSubmit(name){
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