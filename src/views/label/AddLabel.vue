<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>标签管理</BreadcrumbItem>
                <BreadcrumbItem>添加标签</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="8">
                <Form :label-width="80">
                    <FormItem label="标签名称">
                        <Input type="text" ></Input>
                    </FormItem>
                    <FormItem label="分数">
                        <Row>
                            <Col span="12">
                                <Input type="text" ></Input>
                            </Col>
                        </Row>
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
        name: "AddLabel"
    }
</script>

<style scoped>

</style>