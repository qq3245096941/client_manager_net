<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>所有标签</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Row>
            <Col span="3" style="padding: 5px;">
                <Card class="card" style="background: #ed4014">
                    <Icon class="delete" type="md-trash" />
                    <div class="div">
                        <h3>-10分</h3>
                        暂无资金
                    </div>
                </Card>
            </Col>

            <Col span="3" style="padding: 5px;">
                <Card class="card" style="background: #19be6b">
                    <Icon class="delete" type="md-trash"/>
                    <div class="div">
                        <h3>10分</h3>
                        资金充足
                    </div>
                </Card>
            </Col>
        </Row>

    </Card>
</template>

<script>
    export default {
        name: "AllLabel"
    }
</script>

<style scoped>
    .card{
        color: #fff
    }

    .div{
        font-size: 15px;
        padding: 20px;
        position: relative;
        text-align: center;
    }

    .delete{
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
    }
</style>