<template>
    <Modal :value="content.isOpen" :title="client.name" @on-cancel="cancel">
        <CellGroup>
            <Cell title="姓名" :extra="client.name"/>
            <Cell title="电话" :extra="client.phone"/>
            <Cell title="微信号" :extra="client.wxNum"/>
            <Cell title="地址" :extra="client.address"/>
            <Cell title="收入情况" :extra="client.income"/>
            <Cell title="客户等级" :extra="client.lvName"/>
            <Cell title="合作状态" :extra="client.cooperationStatus"/>
            <Cell title="意向标签" :extra="labelList.length===0?'暂无意向标签':''"/>
            <Tag type="dot" v-for="label in labelList" closable
                 :color="label.intentionOfIndicators.intentionOfIndicatorsType===1?'success':'error'">
                {{label.intentionOfIndicators.intentionOfIndicatorsName}}({{label.intentionOfIndicators.intentionOfIndicatorsNum}}分)
            </Tag>
        </CellGroup>
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
                labelList: []
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
                        })
                    }
                }
            }
        },
        mounted() {

        },
        methods: {
            cancel() {
                console.log(this.content);
                this.content.isOpen = false;
            }
        }
    }
</script>

<style scoped>

</style>