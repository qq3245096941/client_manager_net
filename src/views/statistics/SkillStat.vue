<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>统计分析</BreadcrumbItem>
                <BreadcrumbItem>技能分析</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Alert show-icon>只选择部门则进行部门技能分析，选择员工开启员工技能分析</Alert>
        <Row>
            <Col span="8">
                <Form :label-width="80">
                    <FormItem label="选择部门">
                        <Row>
                            <Col span="11">
                                <Select v-model="selectDept" :disabled="user.userType===3">
                                    <Option v-for="(dept,index) in deptList" :value="dept.departmentCode" :key="index">
                                        {{dept.departmentName}}
                                    </Option>
                                </Select>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <Select v-model="selectEmployee" :disabled="user.userType===3">
                                    <Option value="">不选择员工</Option>
                                    <Option v-for="(employee,index) in currentEmployeeList" :value="employee.userCode" :key="index">
                                        {{employee.realName}}
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="选择时间">
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
                if (this.selectDept === '') {
                    this.$Message.error('请至少选择一个部门');
                    return;
                }

                let obj = {
                    endDateTime: this.endDateTime,
                    starDateTime: this.starDateTime
                };

                /*判断是否选择员工，没有则开启部门技能分析*/
                if (this.selectEmployee === '' || this.selectEmployee === undefined) {
                    Reflect.set(obj, 'type', 1);
                    Reflect.set(obj, 'departmentCode', this.selectDept);

                    let dept = (await this.request('/department/queryOne', {id: this.selectDept})).data;

                    let skill = (await this.request('/skillAnalysis/query', obj, 'post')).data;

                    this.funnelMap(`${dept.departmentName}(部门分析)`, skill.map(item => {
                        return {
                            value: item.num,
                            name: item.lvName,
                            message: item.lvText
                        }
                    }))

                } else {
                    Reflect.set(obj, 'type', 2);
                    Reflect.set(obj, 'sysUserCode', this.selectEmployee);

                    let user = (await this.request('/sysUser/queryOne', {
                        id: this.selectEmployee
                    })).data;

                    let skill = (await this.request('/skillAnalysis/query', obj, 'post')).data;

                    this.funnelMap(`${user.realName}(个人分析)`, skill.map(item => {
                        return {
                            value: item.num,
                            name: item.lvName,
                            message: item.lvText
                        }
                    }))
                }
            },
            funnelMap(name, data) {
                echarts.init(document.getElementById('main'), 'macarons').setOption({
                    title: {
                        text: name,
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter(name) {
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
                            minSize: '0%',
                            maxSize: '100%',
                            sort: 'descending',
                            gap: 2,
                            min: 0,
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
            switch (this.user.userType) {
                case 1:
                    this.request('/department/query').then(data=>{
                        this.deptList = data.data;
                    });
                    break;
                case 2:
                    this.request('/department/queryOne',{id:this.user.parentCode}).then(data=>{
                        this.deptList.push(data.data);
                    });
                    break;
                case 4:
                    let currentDeptCode = this.user.parentCode.split(',');
                    currentDeptCode.forEach(item=>{
                        this.request('/department/queryOne',{id:item}).then(data=>{
                            this.deptList.push(data.data);
                        });
                    });
                    break;
            }
        }
    }
</script>

<style scoped>

</style>