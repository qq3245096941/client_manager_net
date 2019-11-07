<template>
    <div>
        <Card>
            <p slot="title">
                <Breadcrumb>
                    <BreadcrumbItem>客户管理</BreadcrumbItem>
                    <BreadcrumbItem>所有客户</BreadcrumbItem>
                </Breadcrumb>
            </p>
            <clientSearch></clientSearch>
            <!--内容-->
            <Tabs value="name1">
                <TabPane label="开发中" name="name1">
                    <Table :columns="columns1" :data="data1"></Table>
                </TabPane>
                <TabPane label="已完成" name="name2">已完成</TabPane>
                <TabPane label="已失败" name="name3">已失败</TabPane>
            </Tabs>
            <Divider dashed/>
            <Page :total="100" show-sizer/>
        </Card>
    </div>
</template>
<script>
    import clientSearch from "../../components/clientSearch";

    export default {
        components:{
            clientSearch
        },
        data() {
            return {
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '攻略进度',
                        key: 'schedule',
                        width:250,
                        render:(h,params)=>{
                            return h('Progress',{
                                props:{
                                    status:'active',
                                    percent:params.row.schedule,
                                }
                            })
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '最后回访时间',
                        key: 'returnVisitTime'
                    },
                    {
                        title: "开发人",
                        key: 'user'
                    },
                    {
                        title: '操作',
                        key: 'option',
                        width:300,
                        render: (h, params) => {
                            return h('ButtonGroup', {
                                props: {
                                    type: 'button',
                                    shape: 'circle'
                                },
                            }, [
                                h('Button', {
                                    props:{
                                        type:'success'
                                    }
                                }, '查看详情'),
                                h('Button', {
                                    props:{
                                        type:'primary'
                                    }
                                }, '修改'),
                                h('Button', {
                                    props:{
                                        type:'warning'
                                    }
                                }, '删除'),
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        name: '刘丰林',
                        phone: 15623554858,
                        schedule: 12,
                        createTime: '2016年10月5日',
                        returnVisitTime: '2016年10月5日',
                        user: '苗文钊'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>