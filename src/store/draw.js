export default {
    getters: {
        /**
         * 绘制饼图
         * el: 容器标签的id
         * title：饼图的标题
         * data：饼图数据=>示例：{value: 335, name: '组2'},
                                 {value: 310, name: '组1'},
                                 {value: 274, name: '组3'},
                                 {value: 235, name: '组4'},
                                 {value: 400, name: '组5'}
         */
        drawPie: () => (id, title, data = []) => {
            /*统计总数*/
            let count = data.map(item=>{
                return item.value
            }).reduce((previousValue,currentValue)=>{
                return previousValue+currentValue;
            });

            data = data.map(item=>{
                return {
                    value:item.value,
                    name:`${item.name}(${item.value}个)`
                }
            });

            echarts.init(document.getElementById(id), 'macarons').setOption({
                title: {
                    text: `${title}(${count}个)`,
                    left: 'center',
                    top: 20,
                },
                tooltip: {
                    trigger: 'item',
                    formatter(val) {
                        return `${val.data.name}<br/>客户量：${val.data.value}<br/>占比：${val.percent}%`
                    }
                },
                series: [
                    {
                        name: '客户量',
                        type: 'pie',
                        radius: ['30%', '60%'],
                        data: [
                            ...data
                        ].sort(function (a, b) {
                            return a.value - b.value;
                        }),
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
    }
}