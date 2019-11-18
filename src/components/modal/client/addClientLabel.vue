<template>
    <Modal :value="content.isOpen" title="添加标签" @on-ok="enter" @on-cancel="content.isOpen = false">
        <CheckboxGroup v-model="clickList">
            <Checkbox style="margin-bottom: 5px" v-for="label in labelList" :disabled="label.disabled"
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
                /*选定的标签*/
                clickList: [],
                /*用户已经有的标签*/
                userLabelList: []
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
                        this.userLabelList = this.clickList = data.map(item => {
                            return item.intentionOfIndicatorsCode;
                        });

                        /*通过判断当前用户是否已经填写过这个标签，将这个标签进行禁用*/
                        this.labelList = this.labelList.map(item => {
                            if (this.clickList.find(click => click === item.intentionOfIndicatorsCode) === undefined) {
                                Reflect.set(item, 'disabled', false);
                            } else {
                                Reflect.set(item, 'disabled', true);
                            }
                            return item;
                        });
                    }
                }
            }
        },
        methods: {
            enter() {
                /*去掉用户已经存在的标签，然后插入*/
                this.clickList = this.clickList.filter(item => {
                    return this.userLabelList.find(userLabel => item === userLabel) === item ? '' : item;
                });

                if (this.clickList.length === 0) {
                    this.$Message.error('您未选择任何标签');
                    this.content.isOpen = false;
                    return;
                }

                this.request('/customerIntention/insert', {
                    clientCode: this.content.clientCode,
                    intentionOfIndicatorsCode: this.clickList.join(',')
                }).then(data => {
                    this.$Message.success('添加成功');
                    window.location.reload();
                    this.content.isOpen = false;
                })
            }
        },
        mounted() {
            this.request('/intentionOfIndicators/query').then(data => {
                this.labelList = data.data;
                this.content.isOpen = false;
            });
        }
    }
</script>

<style scoped>
    .successClass {
        background: #5cb85c !important;
    }
</style>