<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>任务管理</BreadcrumbItem>
                <BreadcrumbItem>发布组任务</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Tabs :value="currentDeptCode" @on-click="clickTab">
            <TabPane v-for="(dept,index) in deptList" :label="dept.departmentName" :name="dept.departmentCode"
                     :key="index">
                <Row>
                    <Col span="8">
                        <Alert :type="dept.status===2?'success':'error'">{{dept.status===2?'已分配任务，再次分配表示修改任务':'暂未分配'}}
                        </Alert>
                        <Form :model="taskForm" :label-width="80">
                            <FormItem label="微信量">
                                <Input type="number" v-model="taskForm.wxNum"></Input>
                            </FormItem>
                            <FormItem label="业绩目标">
                                <Input type="number" v-model="taskForm.performanceObjectives">
                                    <span slot="append">万</span>
                                </Input>
                            </FormItem>
                            <FormItem label="任务描述">
                                <Input v-model="taskForm.missionText" type="textarea"
                                       :autosize="{minRows: 3,maxRows: 5}"/>
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
                    wxNum: 0,
                    performanceObjectives: 0,
                    missionText: ''
                },
                /*当前正在选择的组的code*/
                currentDeptCode: '',
                /*当前正在选择的组的部门taskCode*/
                taskCode: ''
            }
        },
        methods: {
            async submit(dept) {
                if (dept.status === 2) {
                    Reflect.set(this.taskForm, 'missionCode', this.taskCode);
                    await this.request('/mission/update', this.taskForm);
                    this.$Message.success('更新成功');
                } else {
                    Reflect.set(this.taskForm, 'missionType', 2);
                    Reflect.set(this.taskForm, 'relevanceCode', dept.departmentCode);
                    await this.request('/mission/insert', this.taskForm);
                    this.$Message.success('分配成功');
                }

                this.request('/department/query', {type: 1}).then(data => {
                    this.deptList = data.data;
                })
            },
            async clickTab(name) {
                /*每次初始化*/
                this.taskForm = {
                    wxNum: 0,
                    performanceObjectives: 0,
                    missionText: ''
                };

                this.currentDeptCode = name;
                let currentTask = (await this.request('/mission/week', {
                    id: name,
                    type: 2,
                    weekType: 2
                }, 'post')).data;

                if (currentTask.mission.length > 0) {
                    let task = currentTask.mission[0];
                    this.taskCode = task.missionCode;

                    Reflect.ownKeys(task).forEach(key => {
                        if (Reflect.has(this.taskForm, key)) {
                            Reflect.set(this.taskForm, key, Reflect.get(task, key))
                        }
                    });
                }
            }
        },
        mounted() {
            this.request('/department/query',{
                type: 1,
                sysUserCode:this.user.userCode
            }).then(data => {
                this.currentDeptCode = data.data[0].departmentCode;
                this.clickTab(this.currentDeptCode);
                this.deptList = data.data;
            })
        }
    }
</script>

<style scoped>

</style>