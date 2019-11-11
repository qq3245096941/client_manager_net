<template>
    <Modal :value="content.isOpen" title="添加标签" @on-ok="enter" @on-cancel="cancel">
        <CheckboxGroup v-model="clickList">
            <Checkbox true-value="1" false-value="0" style="margin-bottom: 5px" v-for="label in labelList"
                      :label="label.intentionOfIndicatorsCode" border>
                {{label.intentionOfIndicatorsName}}
                <Badge :class-name="label.intentionOfIndicatorsType===1?'successClass':''"
                       :count="label.intentionOfIndicatorsNum"></Badge>
            </Checkbox>
        </CheckboxGroup>
    </Modal>
</template>

<script>
    export default {
        name: "AddClientLabel",
        data() {
            return {
                labelList: [],
                clickList: []
            }
        },
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        watch: {
            /*监听页码变化*/
            'content.isOpen': {
                async handler(isOpen) {
                    if (isOpen === true) {
                        let data = (await this.request('/customerIntention/query', {clientCode: this.content.clientCode})).data;
                        console.log(data);
                    }
                }
            }
        },
        methods: {
            enter() {
                this.request('/customerIntention/insert', {
                    clientCode: this.content.clientCode,
                    intentionOfIndicatorsCode: this.clickList.join(',')
                }).then(data => {
                    this.$Message.success('添加成功');
                    this.content.isOpen = false;
                })
            },
            cancel() {
                this.content.isOpen = false;
            }
        },
        mounted() {
            this.request('/intentionOfIndicators/query').then(data => {
                this.labelList = data.data;
                this.content.isOpen = false;
            })
        }
    }
</script>

<style scoped>
    .successClass {
        background: #5cb85c !important;
    }
</style>