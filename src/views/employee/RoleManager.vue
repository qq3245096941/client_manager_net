<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>所有角色</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Tabs type="card">
            <TabPane label="所有角色">
                <Table :columns="columns1" :data="data1"></Table>
            </TabPane>
            <TabPane label="添加角色">
                <Row>
                    <Col span="8">
                        <Form :label-width="80">
                            <FormItem label="角色名称">
                                <Input></Input>
                            </FormItem>
                            <FormItem label="角色描述">
                                <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary">提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
    export default {
        name: "RoleManager",
        data(){
            return{
                columns1:[
                    {
                        title:'姓名',
                        key:'name',
                        width:100
                    },
                    {
                        title:'描述',
                        key:'desc'
                    }
                ],
                data1:[
                    {
                        name:'组长',
                        desc:'组长'
                    },
                    {
                        name:'组员',
                        desc:'组员'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>