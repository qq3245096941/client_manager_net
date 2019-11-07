<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>客户管理</BreadcrumbItem>
                <BreadcrumbItem>所有等级</BreadcrumbItem>
            </Breadcrumb>
        </p>

        <Table :columns="columns1" :data="data1"></Table>
    </Card>
</template>

<script>
    export default {
        name: "AllClass",
        data(){
            return{
                columns1:[
                    {
                        title:'等级名称',
                        key:'name',
                        width:100
                    },
                    {
                        title:'等级描述',
                        key:'desc'
                    }
                ],
                data1:[
                    {
                        name:'A级',
                        desc:'成交客户'
                    },
                    {
                        name:'B级',
                        desc:'见面客户'
                    },
                    {
                        name:'C级',
                        desc:'有项目意向客户且能邀约的'
                    },
                    {
                        name:'D级',
                        desc:'回访中能够有效沟通的客户'
                    },
                    {
                        name:'E级',
                        desc:'放弃客户'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>