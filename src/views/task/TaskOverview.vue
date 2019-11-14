<!--任务总览-->
<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>任务管理</BreadcrumbItem>
                <BreadcrumbItem>任务总览</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Tabs :value="currentDeptCode" :animated="false" @on-click="selectDept">
            <TabPane v-for="(dept,index) in deptList" :name="dept.departmentCode"
                     :label="dept.departmentName" :key="index">
                <div :id="'main'+dept.departmentCode" style="width: 600px;height:300px;"></div>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    export default {
        name: "TaskOverview",
        data() {
            return {
                deptList: [],
                currentDeptCode:''
            }
        },
        methods: {
            async selectDept(code) {
                this.currentDeptCode = code;

                let list = [];
                let data = [];

                /*通过部门code获取员工*/
                let employeeList = (await this.request('/sysUser/query', {
                    parentCode: code,
                    userType:3
                })).data;

                for(let employee of employeeList){
                    list.push(employee.realName);


                    let week = (await this.request('/mission/week',{
                        id:employee.userCode,
                        type:3,
                        weekType:2
                    })).data;

                    data.push(week.wxNum);
                }

                this.histogram({
                    id:`main${code}`,
                    color:'',
                    title:'员工微信统计图'
                    ,list
                    ,data
                });
            },
            /**
             * @param data.id 标签id
             * @param data.color 柱形图颜色
             * @param data.message 标题和每个柱形图代表的意思
             * @param data.list 柱形图x坐标的名称  ['张三','李四','王五']
             * @param data.data y轴的值 [1,2,3]
             */
            histogram(data = {}) {
                console.log(data.id);
                // 基于准备好的dom，初始化echarts实例
                echarts.init(document.getElementById(data.id), 'macarons').setOption({
                    color: data.color,
                    tooltip: {},
                    legend: {
                        data: [data.message]
                    },
                    xAxis: {
                        data: [...data.list]
                    },
                    yAxis: {},
                    series: [{
                        name: data.message,
                        type: 'bar',
                        data: [...data.data]
                    }]
                });
            }
        },
        mounted() {
            this.$Notice.info({
                duration:0,
                title:'提示',
                desc: '任务总览不会显示未分配任务的部门，请管理员对未分配任务的部门进行分配'
            });

            /*过滤掉没有分配任务的部门*/
            this.request('/department/query', {type: 1}).then(data => {
                this.deptList = data.data.filter(item => {
                    return item.status === 2;
                });

                this.currentDeptCode = this.deptList[0].departmentCode;
                this.selectDept(this.currentDeptCode);
            })
        }
    }
</script>

<style scoped>

</style>