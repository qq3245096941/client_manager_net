<template>
    <Card>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>所有员工</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <div id="tree" style="width: 1000px;height:400px;margin: 0 auto"></div>
    </Card>
</template>

<script>
    export default {
        name: "AllEmployee",
        methods:{
            async getTreeMapData() {
                /*部门数据*/
                let departmentList = (await this.$store.getters.request('/department/query')).data;
                /*树图数据*/
                let treeData = [];
                for (const department of departmentList) {
                    /*父节点对象*/
                    let parent = {};
                    /*页节点数组*/
                    let children = [];
                    Reflect.set(parent, 'name', department.departmentName);
                    let userList = (await this.$store.getters.request('/sysUser/query', {
                        parentCode: department.departmentCode
                    })).data;
                    userList.forEach(user => {
                        children.push({
                            children: [],
                            name:  user.realName+(user.userType === 2 ? '(组长)' : '')
                        });
                    });
                    Reflect.set(parent, 'children', children);
                    treeData.push(parent);
                }
                return [{
                    name: '总平台',
                    children: treeData
                }];
            }
        },
        mounted() {
            this.getTreeMapData().then(data => {
                echarts.init(document.getElementById('tree'), 'macarons').setOption({
                    series: [
                        {
                            type: 'tree',
                            data,
                            orient: 'vertical',
                            expandAndCollapse: true,
                            label: {
                                normal: {
                                    position: 'bottom',
                                    verticalAlign: 'middle',
                                    align: 'center',
                                    fontSize: 12
                                }
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'bottom',
                                        verticalAlign: 'middle',
                                        align: 'center'
                                    }
                                }
                            },
                            animationDurationUpdate: 500
                        }
                    ]
                });
            });
        }
    }
</script>

<style scoped>


</style>