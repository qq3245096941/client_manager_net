<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>所有标签</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Row>
            <Col v-for="(label,index) in labelList" span="3" style="padding: 5px;" :key="index">
                <Card class="card" :style="{background:label.intentionOfIndicatorsType===1?'#19be6b':'#ed4014'}">
                    <Icon class="delete" type="md-trash" @click="deleteLabel(label.intentionOfIndicatorsCode,index)"/>
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
            })
        },
        methods: {
            deleteLabel(code, index) {
                if (!confirm('确定删除吗?')) return;

                this.request('/intentionOfIndicators/delete', {
                    ids: code
                }).then(data => {
                    if (data.succeed === 1) {
                        this.$Message.success('删除成功');
                        this.labelList.splice(index, 1);
                    } else {
                        this.$Message.error(data.message);
                    }
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