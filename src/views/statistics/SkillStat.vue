<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>统计分析</BreadcrumbItem>
                <BreadcrumbItem>技能分析</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Rwo>
            <Col span="8">
                <Form :label-width="80">
                    <!--分数区间-->
                    <FormItem label="选择部门">
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
        </Rwo>

        <div>
            <div id="main" style="width: 80%;height: 600px"></div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "skillStat",
        mounted() {
            echarts.init(document.getElementById('main'),'macarons').setOption({
                title: {
                    text: '苗文钊',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    data: ['展现','点击','访问','咨询','订单']
                },
                calculable: true,
                series: [
                    {
                        name:'漏斗图',
                        type:'funnel',
                        left: '10%',
                        top: 60,
                        //x2: 80,
                        bottom: 60,
                        width: '80%',
                        // height: {totalHeight} - y - y2,
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
                        data: [
                            {value: 5, name: 'A类客户'},
                            {value: 10, name: 'B类客户'},
                            {value: 30, name: 'C类客户'},
                            {value: 70, name: 'D类客户'},
                            {value: 100, name: 'E类客户'}
                        ]
                    }
                ]
            });
        }
    }
</script>

<style scoped>

</style>