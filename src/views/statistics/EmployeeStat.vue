<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>统计分析</BreadcrumbItem>
                <BreadcrumbItem>客户统计</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="8">
                <Form :label-width="80">
                    <!--时间区间-->
                    <FormItem label="时间区间">
                        <Row>
                            <Col span="11">
                                <DatePicker type="date" name="startTime"
                                            placeholder="开始时间"></DatePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <DatePicker type="date" name="endTime" placeholder="结束时间"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>

                    <!--分数区间-->
                    <FormItem label="分数区间">
                        <Row>
                            <Col span="11">
                                <Input placeholder="最小分数"></Input>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <Input placeholder="最大分数"></Input>
                            </Col>
                        </Row>
                    </FormItem>

                    <!--分数区间-->
                    <FormItem label="部门区间">
                        <Row>
                            <Col span="11">
                                <Input placeholder="选择部门"></Input>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <Input placeholder="选择员工"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Col>
        </Row>

        <Divider dashed/>
        <!--员工详情-->
        <Tabs type="card">
            <TabPane label="总量统计">
                <div id="zong" style="width: 100%;height: 500px"></div>
            </TabPane>
            <TabPane label="类型统计">
                <Row>
                    <Col span="6">
                        <div id="main" style="width: 100%;height: 300px;padding: 5px"></div>
                    </Col>

                    <Col span="6">
                        <div id="main1" style="width: 100%;height: 300px;padding: 5px"></div>
                    </Col>

                    <Col span="6">
                        <div id="main2" style="width: 100%;height: 300px;padding: 5px"></div>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>

    </Card>
</template>

<script>
    export default {
        name: "EmployeeStat",
        methods: {
            drawPie(el, title, data = []) {
                echarts.init(document.getElementById(el),'macarons').setOption({
                    title: {
                        text: title,
                        left: 'center',
                        top: 20,
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: '客户量',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                ...data
                                /*{value: 335, name: '组2'},
                                {value: 310, name: '组1'},
                                {value: 274, name: '组3'},
                                {value: 235, name: '组4'},
                                {value: 400, name: '组5'}*/
                            ].sort(function (a, b) {
                                return a.value - b.value;
                            }),
                            roseType: 'radius',
                            labelLine: {
                                normal: {
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // 设置扇形的阴影
                                    shadowBlur: 30,
                                    shadowColor: 'rgba(130,125,131,0.3)',
                                    shadowOffsetX: -5,
                                    shadowOffsetY: 5

                                }
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                })
            }
        },
        mounted() {
            this.drawPie('zong','客户总量',
                [{value: 435, name: 'A类客户(435)'},
                {value: 510, name: 'B类客户(510)'},
                {value: 500, name: 'C类客户(500)'},
                {value: 535, name: 'D类客户(535)'},
                {value: 500, name: 'E类客户(500)'}]);

            this.drawPie('main', 'A类客户',
                [{value: 335, name: '组2(335)'},
                    {value: 310, name: '组1(310)'},
                    {value: 274, name: '组3(274)'},
                    {value: 235, name: '组4(235)'},
                    {value: 400, name: '组5(400)'}]);

            this.drawPie('main1', 'B类客户',
                [{value: 225, name: '组2(225)'},
                    {value: 310, name: '组1(310)'},
                    {value: 324, name: '组3(324)'},
                    {value: 225, name: '组4(225)'},
                    {value: 300, name: '组5(300)'}]);

            this.drawPie('main2', 'C类客户',
                [{value: 225, name: '组2(225)'},
                    {value: 210, name: '组1(210)'},
                    {value: 324, name: '组3(324)'},
                    {value: 215, name: '组4(215)'},
                    {value: 200, name: '组5(200)'}]);
        }
    }
</script>

<style scoped>

</style>