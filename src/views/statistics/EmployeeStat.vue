<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>统计分析</BreadcrumbItem>
                <BreadcrumbItem>客户统计</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <!--时间-->
        <Form :label-width="80">
            <Row>
                <Col span="8">
                    <FormItem label="选择时间">
                        <Row>
                            <Col span="11">
                                <DatePicker type="datetime" name="startTime" placeholder="开始时间"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            v-model="timeForm.starDateTime"
                                            @on-change="timeForm.starDateTime=$event"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <DatePicker type="datetime" name="endTime" placeholder="结束时间"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            v-model="timeForm.endDateTime"
                                            @on-change="timeForm.endDateTime=$event"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="getData">确定</Button>
                    </FormItem>
                </Col>
            </Row>

        </Form>

        <Tabs type="card">
            <!--总计统计-->
            <TabPane label="总量统计">
                <div id="zong" style="width: 100%;height: 500px"></div>
            </TabPane>
            <!--类型统计-->
            <TabPane label="类型统计">
                <Row>
                    <Col span="8" v-for="(dept,index) in deptDrawList" :key="index">
                        <div :id="'main'+index" style="width: 100%;height: 300px;padding: 5px"></div>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    export default {
        name: "EmployeeStat",
        data() {
            return {
                deptDrawList: [],
                timeForm: {
                    starDateTime: '',
                    endDateTime: ''
                }
            }
        },
        methods: {
            getData(){
                /*查询全部部门的客户等级*/
                this.request('/skillAnalysis/queryLv', this.timeForm).then(data => {
                    this.$store.getters.drawPie('zong', '客户总量',
                        data.data.map(item => {
                            return {
                                value: item.num,
                                name: item.lvName
                            }
                        }));
                });

                this.request('/lv/query').then(dept => {
                    this.deptDrawList = Array.from({length: dept.data.length}).map((item, index) => {
                        return index;
                    });

                    this.request('/skillAnalysis/queryDepartment', this.timeForm).then(data => {
                        this.deptDrawList = data.data;

                        this.deptDrawList.forEach((item, index) => {
                            this.$store.getters.drawPie(`main${index}`, item.lvName, item.departmentList.map(data => {
                                return {
                                    value: data.num,
                                    name: data.name
                                }
                            }));
                        })
                    })
                })
            }
        },
        mounted() {
           this.getData();
        }
    }
</script>

<style scoped>

</style>