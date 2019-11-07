<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>添加员工</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Row>
            <Col span="8">
                <Form :label-width="80">
                    <FormItem label="员工姓名">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="员工类型">
                        <Select placeholder="选择人员类型">
                            <Option value="beijing">经理</Option>
                            <Option value="shanghai">员工</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="选择部门">
                        <Select placeholder="选择部门">
                            <Option value="beijing">经理</Option>
                            <Option value="shanghai">员工</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="选择角色">
                        <Select placeholder="选择角色">
                            <Option value="beijing">经理</Option>
                            <Option value="shanghai">员工</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="账号">
                        <Input placeholder="登录账号，必须为手机号"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input placeholder="登录密码"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary">登录</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "AddEmployee"
    }
</script>

<style scoped>

</style>