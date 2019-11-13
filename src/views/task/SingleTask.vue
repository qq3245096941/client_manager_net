<template>
    <Card dis-hover>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>任务管理</BreadcrumbItem>
                <BreadcrumbItem>发布单人任务</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Card v-for="(employee,index) in employeeList" :key="index">
            <Modal v-model="employee.modal" title="修改任务量" @on-cancel="employee.modal = false" @on-ok="modalOk(employee)">
                <Form :label-width="80">
                    <FormItem label="任务量">
                        <Input v-model="employee.rwWXNum"/>
                    </FormItem>
                </Form>
            </Modal>
            <p slot="title">
                {{employee.realName}}
            </p>
            <Row>
                <Col span="10">
                    <Form :label-width="80">
                        <FormItem label="任务量">
                            <Input disabled :value="employee.rwWXNum===0?'暂未分配任务':employee.rwWXNum" />
                        </FormItem>
                        <FormItem label="已完成">
                            <span style="font-size: 20px">{{employee.WXNum}}</span>
                        </FormItem>
                        <FormItem>
                            <Button type="success" @click="employee.modal = true">修改任务量</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Card>

    </Card>
</template>

<script>
    export default {
        name: "SingleTask",
        data() {
            return {
                employeeList: [],
            }
        },
        methods: {
            modalOk(employee){
                console.log(employee.week);
            }
        },

        async mounted() {

            let employeeList = (await this.request('/sysUser/query', {
                parentCode: this.user.parentCode,
                userType: 3
            })).data;

            for (let employee of employeeList) {
                /*获取本周任务量*/
                let week = (await this.request('/mission/week', {
                    id:employee.userCode,
                    type:3,
                    weekType:1
                })).data;

                Reflect.set(employee,'modal',false);
                Reflect.set(employee,'week',week);
            }

            this.employeeList = employeeList;
        }
    }
</script>

<style scoped>

</style>