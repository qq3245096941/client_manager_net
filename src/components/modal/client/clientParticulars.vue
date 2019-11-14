<template>
    <Modal :value="content.isOpen" :title="client.name" @on-cancel="cancel" @on-ok="content.isOpen = false" width="800">
        <Tag type="dot" v-for="(label,index) in labelList" closable @on-close="labelDelete(label,index)" size="large"
             :color="label.intentionOfIndicators.intentionOfIndicatorsType===1?'success':'error'">
            {{label.intentionOfIndicators.intentionOfIndicatorsName}}({{label.intentionOfIndicators.intentionOfIndicatorsNum}}分)
        </Tag>
        <Divider />
        <Collapse accordion value="1">
            <Panel name="1">
                基本信息
                <p slot="content">
                    <CellGroup>
                        <Cell title="姓名" :extra="client.name"/>
                        <Cell title="电话" :extra="client.phone"/>
                        <Cell title="微信号" :extra="client.wxNum"/>
                        <Cell title="地址" :extra="client.address"/>
                        <Cell title="收入情况" :extra="client.income"/>
                        <Cell title="客户等级" :extra="client.lvName"/>
                        <Cell title="合作状态" :extra="client.cooperationStatus"/>
                        <Cell title="资产评估" :label="client.property"/>
                    </CellGroup>
                </p>
            </Panel>

            <Panel name="2">
                回访记录
                <div slot="content">
                    <Timeline>
                        <TimelineItem v-for="(visit,index) in returnVisit" :key="index">
                            <p class="time">{{visit.createTime}}</p>
                            <p class="content">{{visit.recordRemarks}}</p>
                        </TimelineItem>
                    </Timeline>
                </div>
            </Panel>
        </Collapse>

    </Modal>
</template>

<script>
    export default {
        name: "clientParticulars",
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                client: {},
                labelList: [],
                returnVisit: []
            }
        },
        watch: {
            /*监听页码变化*/
            'content.isOpen': {
                handler(isOpen) {
                    if (isOpen === true) {
                        this.request('/client/queryOne', {
                            id: this.content.clientCode
                        }).then(data => {
                            this.client = this.$store.getters.tidyClient(data.data);
                            this.labelList = this.client.customerIntention;
                            console.log(this.labelList);
                        });

                        this.request('/returnVisitToRecord/query', {
                            clientCode: this.content.clientCode,
                            returnVisitToRecordStatus: 3,
                            returnVisitToRecordType: 1
                        }).then(data => {
                            this.returnVisit = data.data.map(item=>{
                                item.createTime = moment(item.createTime).format('YYYY年MM月DD日');
                                return item;
                            })
                        })
                    }
                }
            }
        },
        methods: {
            cancel() {
                this.content.isOpen = false;
            },
            /*标签删除*/
            labelDelete(label, index) {
                if (confirm('确定删除吗?')) {
                    this.request('/customerIntention/delete', {ids: label.customerIntentionCode}).then(data => {
                        this.labelList.splice(index, 1);
                        this.$Message.success('删除成功');
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>