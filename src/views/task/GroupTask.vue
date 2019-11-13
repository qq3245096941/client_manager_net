<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>任务管理</BreadcrumbItem>
                <BreadcrumbItem>发布组任务</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Tabs value="name1" @on-click="getTab" :animated="false">
            <TabPane v-for="dept in deptList" :label="dept.departmentName" :name="dept.departmentCode">
                <Row>
                    <Col span="8">
                        <Alert :type="dept.status===2?'success':'error'">{{dept.status===2?'已分配任务，再次分配表示修改任务':'暂未分配'}}
                        </Alert>
                        <Form :model="taskForm" :label-width="80">
                            <FormItem label="微信量">
                                <Input v-model="taskForm.wxNum"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit(dept)">提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    export default {
        name: "GroupTask",
        data() {
            return {
                deptList: [],
                taskForm: {
                    wxNum: 0
                },
                taskCode: ''
            }
        },
        methods: {
            async submit(dept) {
                if (dept.status === 2) {
                    await this.request('/mission/update', {
                        wxNum: this.taskForm.wxNum,
                        missionCode: this.taskCode
                    });
                    this.$Message.success('更新成功');

                } else {
                    await this.request('/mission/insert', {
                        wxNum: this.taskForm.wxNum,
                        missionType: 2,
                        relevanceCode: dept.departmentCode
                    });
                    this.$Message.success('分配成功');

                }

                this.request('/department/query', {type: 1}).then(data => {
                    this.deptList = data.data;
                })
            },
            async getTab(name) {
                let currentTask = (await this.request('/mission/week', {
                    id: name,
                    type: 2,
                    weekType: 2
                }, 'post')).data;

                this.taskForm.wxNum = currentTask.rwWXNum;
                this.taskCode = currentTask.mission[0].missionCode;
            }
        },
        mounted() {
            this.request('/department/query', {type: 1}).then(data => {
                this.deptList = data.data;
            })
        }
    }
</script>

<style scoped>

</style>