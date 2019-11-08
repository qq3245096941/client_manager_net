<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>所有标签</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Row>
            <Col v-for="label in labelList" span="3" style="padding: 5px;">
                <Card class="card" :style="{background:label.intentionOfIndicatorsType===1?'#19be6b':'#ed4014'}">
                    <Icon class="delete" type="md-trash" @click="deleteLabel(label.intentionOfIndicatorsCode)"/>
                    <div class="div">
                        <h3>{{label.intentionOfIndicatorsNum}}分</h3>
                        {{label.intentionOfIndicatorsName}}
                    </div>
                </Card>
            </Col>
        </Row>

    </Card>
</template>

<script>
    export default {
        name: "AllLabel",
        data() {
            return {
                labelList: []
            }
        },
        mounted() {
            this.request('/intentionOfIndicators/query').then(data => {
                this.labelList = data.data;
                console.log(this.labelList);
            })
        },
        methods: {
            deleteLabel(code) {
                this.request('/intentionOfIndicators/delete', {
                    ids: code
                }).then(data => {
                    if(data.succeed===1){
                        this.$Message.success('删除成功');
                    }
                    this.$Message.error(data.message);
                })
            }
        }
    }
</script>

<style scoped>
    .card {
        color: #fff
    }

    .div {
        font-size: 15px;
        padding: 20px;
        position: relative;
        text-align: center;
    }

    .delete {
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
    }
</style>