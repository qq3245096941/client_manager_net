<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>客户管理</BreadcrumbItem>
                <BreadcrumbItem>添加等级</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Row>
            <Col span="8">
                <Form :label-width="80">
                    <FormItem label="等级名称">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="等级描述">
                        <Input type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
                    </FormItem>

                    <FormItem>
                        <Button type="primary">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>

    </Card>
</template>

<script>
    export default {
        name: "AddClass"
    }
</script>

<style scoped>

</style>