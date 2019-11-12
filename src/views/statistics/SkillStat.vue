<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>统计分析</BreadcrumbItem>
                <BreadcrumbItem>技能分析</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="8">
                <Form :label-width="80">
                    <!--分数区间-->
                    <FormItem label="选择部门">
                        <Row>
                            <Col span="11">
                                <Select v-model="selectDept">
                                    <Option v-for="(dept,index) in deptList" :value="dept.departmentCode"
                                            :key="index">
                                        {{dept.departmentName}}
                                    </Option>
                                </Select>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <Select v-model="selectEmployee">
                                    <Option v-for="(employee,index) in currentEmployeeList" :value="employee.userCode"
                                            :key="index">
                                        {{employee.realName}}
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="选择部门">
                        <Row>
                            <Col span="11">
                                <DatePicker type="datetime" name="startTime" placeholder="开始时间"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            v-model="starDateTime"
                                            @on-change="starDateTime=$event"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <DatePicker type="datetime" name="endTime" placeholder="结束时间"
                                            format="yyyy-MM-dd HH:mm:ss"
                                            v-model="endDateTime"
                                            @on-change="endDateTime=$event"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="submit">开始分析</Button>
                    </FormItem>

                </Form>
            </Col>
        </Row>

        <div>
            <div id="main" style="width: 60%;height: 400px;margin: 0 auto"></div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "skillStat",
        data() {
            return {
                deptList: [],
                currentEmployeeList: [],
                selectDept: '',
                selectEmployee: '',
                starDateTime: '',
                endDateTime: ''
            }
        },
        watch: {
            selectDept(val) {
                this.request('/sysUser/query', {
                    parentCode: val
                }).then(data => {
                    this.currentEmployeeList = data.data;
                })
            }
        },
        methods: {
            async submit() {
                let user = (await this.request('/sysUser/queryOne', {
                    id: this.selectEmployee
                })).data;

                let skill = (await this.request('/skillAnalysis/query', {
                    sysUserCode: this.selectEmployee,
                    starDateTime: this.starDateTime,
                    endDateTime: this.endDateTime
                }, 'post')).data;

                console.log(skill);


                this.funnelMap(user.realName, skill.map(item => {
                    return {
                        value: item.num,
                        name: item.lvName,
                        message: item.lvText
                    }
                }))

            },
            funnelMap(name, data) {
                echarts.init(document.getElementById('main'), 'macarons').setOption({
                    title: {
                        text: name,
                        subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter(name) {
                            console.log(name);
                            return `${name.data.name}：${name.value}<br>
                                    ${name.data.message === null ? '' : name.data.message}`;

                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name: '漏斗图',
                            type: 'funnel',
                            left: '10%',
                            top: 60,
                            bottom: 60,
                            width: '80%',
                            min: 0,
                            max: 100,
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending',
                            gap: 2,
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            labelLine: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            },
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1
                            },
                            emphasis: {
                                label: {
                                    fontSize: 20
                                }
                            },
                            data
                        }
                    ]
                });
            }
        },
        mounted() {
            /*获取部门列表*/
            this.request('/department/query').then(data => {
                this.deptList = data.data;
            });

            this.funnelMap();
        }
    }
</script>

<style scoped>

</style>