<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>统计分析</BreadcrumbItem>
                <BreadcrumbItem>客户统计</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <!--员工详情-->
        <Tabs type="card">
            <TabPane label="总量统计">
                <div id="zong" style="width: 100%;height: 500px"></div>
            </TabPane>
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
                deptDrawList: []
            }
        },
        mounted() {
            /*查询全部部门的客户等级*/
            this.request('/skillAnalysis/queryLv').then(data => {
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

                this.request('/skillAnalysis/queryDepartment').then(data => {
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
    }
</script>

<style scoped>

</style>