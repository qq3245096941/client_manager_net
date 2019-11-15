<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>所有标签</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row :gutter="8">
            <Col v-for="(label,index) in labelList" style="margin-bottom: 5px" span="3" :key="index" >
                <Card class="card" :style="{background:label.intentionOfIndicatorsType===1?'#19be6b':'#ed4014'}">
                    <h1>{{label.intentionOfIndicatorsNum}}分</h1>
                    <p>{{label.intentionOfIndicatorsName}}</p>
                    <ButtonGroup size="small" v-show="user.userType!==3">
                        <Button shape="circle" icon="ios-brush"
                                @click="editLabel(label.intentionOfIndicatorsCode)"></Button>
                        <Button shape="circle" icon="md-trash"
                                @click="deleteLabel(label.intentionOfIndicatorsCode,index)"></Button>
                    </ButtonGroup>
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
            },
            /*编辑标签*/
            editLabel(code) {
                this.$router.push({path: '/AddLabel', query: {code}})
            }
        }
    }
</script>

<style scoped>
    .card {
        color: #fff
    }
</style>