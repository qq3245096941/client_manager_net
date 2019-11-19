<template>
    <Card>
        <Modal :value="isOpen" title="查看详情" @on-cancel="isOpen=false" @on-ok="isOpen=false">
            <Alert show-icon type="success">点击复制账号和密码，直接复制在剪切板上。</Alert>
            <Collapse v-model="currentColl" accordion>
                <Panel v-for="(employee,index) in userData" :key="index" :name="index+''">
                    {{employee.realName}}
                    <div slot="content">
                        <CellGroup>
                            <Cell v-show="user.userType===1" :title="employee.nickName" label="账号" name="username"></Cell>
                            <Cell v-show="user.userType===1" :title="employee.passWord" label="密码" name="password"></Cell>
                            <Cell title="姓名">
                                <Tag checkable slot="extra" color="primary">{{employee.realName}}</Tag>
                            </Cell>
                            <Cell title="加入时间" :extra="employee.createTime"/>
                            <Cell title="角色" :extra="employee.roleName"/>
                            <Cell title="人员类型" :extra="employee.userType"/>
                            <Cell title="操作" v-show="user.userType===1">
                                <ButtonGroup slot="extra">
                                    <Button type="error" @click="deleteEmployee(employee.userCode)">删除</Button>
                                    <Button type="success" @click="editEmployee(employee.userCode)">修改</Button>
                                </ButtonGroup>
                            </Cell>
                        </CellGroup>
                    </div>
                </Panel>
            </Collapse>
        </Modal>

        <div slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>所有员工</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Alert show-icon type="warning">点击员工小圆点，查看员工详细信息。</Alert>
        <div id="tree" style="width: 1000px;height:400px;margin: 0 auto"></div>
    </Card>
</template>

<script>
    export default {
        name: "AllEmployee",
        data() {
            return {
                isOpen: false,
                userData: [],
                currentColl: ''
            }
        },
        watch: {
            /*监听v-for渲染完成*/
            userData() {
                this.$nextTick(() => {
                    this.currentColl = '0';
                })
            }
        },
        methods: {
            editEmployee(code) {
                this.$router.push({path: '/AddEmployee', query: {code}})
            },
            deleteEmployee(code) {
                if (!confirm('确定删除吗?')) return;

                this.request('/sysUser/delete',{
                    ids:code
                }).then(data=>{
                    window.location.reload();
                    this.$Message.success('删除成功');
                })
            },
            /*点击节点进入员工详情*/
            treeClick(param) {
                if (param.data.code === null) return;

                this.userData = [];
                this.isOpen = true;

                const employeeCodeList = param.data.code.split(',');
                for (let code of employeeCodeList) {
                    this.request('/sysUser/queryOne', {
                        id: code
                    }).then(data => {
                        this.userData.push(this.$store.getters.tidyEmployee(data.data));
                    })
                }
            }
        },
        mounted() {
            this.request('/sysUser/tree').then(data => {
                const tree = echarts.init(document.getElementById('tree'), 'macarons');
                tree.on('click', this.treeClick);
                tree.setOption({
                    series: [
                        {
                            type: 'tree',
                            data: data.data,
                            orient: 'vertical',
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
                            /*默认展开的层数*/
                            initialTreeDepth: 4,
                            animationDurationUpdate: 500,
                            roam:'move'
                        }
                    ]
                });
            });
        }
    }
</script>

<style scoped>

</style>