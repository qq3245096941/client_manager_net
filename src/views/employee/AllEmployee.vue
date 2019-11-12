<template>
    <Card>
        <Modal :value="modal.isOpen" :title="modal.userData.realName" @on-cancel="editUser(modal.userData.userCode)"
               cancel-text="修改">
            <Alert show-icon type="success">点击账号和密码，直接复制。</Alert>
            <CellGroup @on-click="userForm">
                <Cell :title="modal.userData.nickName" label="账号" name="username"/>
                <Cell :title="modal.userData.passWord" label="密码" name="password"/>
                <Cell title="姓名" :extra="modal.userData.realName"/>
                <Cell title="加入时间" :extra="modal.userData.createTime"/>
                <Cell title="角色" :extra="modal.userData.roleName"/>
                <Cell title="人员类型" :extra="modal.userData.userType"/>
            </CellGroup>
        </Modal>
        <p slot="title">
            <Breadcrumb>
                <BreadcrumbItem>员工管理</BreadcrumbItem>
                <BreadcrumbItem>所有员工</BreadcrumbItem>
            </Breadcrumb>
        </p>
        <Alert show-icon type="warning">点击员工小圆点，查看员工详细信息。</Alert>
        <div id="tree" style="width: 1000px;height:400px;margin: 0 auto"></div>
    </Card>
</template>

<script>
    export default {
        name: "AllEmployee",
        data() {
            return {
                modal: {
                    isOpen: false,
                    userData: {}
                }
            }
        },
        methods: {
            /*修改用户*/
            editUser(code) {
                this.$router.push({path: '/AddEmployee', query: {code}});
            },
            userForm(name) {
                switch (name) {
                    case 'username':
                        document.execCommand(this.modal.userData.nickName, false, '#000');
                        this.$Message.success('复制成功');
                        break;
                    case 'password':
                        document.execCommand(this.modal.userData.password, false, '#000');
                        this.$Message.success('复制成功');
                        break;
                }
            },
            async getTreeMapData() {
                /*部门数据*/
                let departmentList = (await this.request('/department/query')).data;
                /*树图数据*/
                let treeData = [];
                for (const department of departmentList) {
                    /*父节点对象*/
                    let parent = {};
                    /*页节点数组*/
                    let children = [];
                    Reflect.set(parent, 'name', department.departmentName);
                    let userList = (await this.request('/sysUser/query', {
                        parentCode: department.departmentCode
                    })).data;
                    userList.forEach(user => {
                        children.push({
                            children: [],
                            code: user.userCode,
                            name: user.realName + (user.userType === 2 ? '(组长)' : '')
                        });
                    });
                    Reflect.set(parent, 'children', children);
                    treeData.push(parent);
                }

                console.log(treeData);
                return [{
                    name: '总平台',
                    children: treeData
                }];
            },
            treeClick(param) {
                console.log(param);
                /*进入方法必须是叶节点，也就是必须是员工*/
                if (param.data.children.length > 0) return;

                this.modal.isOpen = true;
                this.request('/sysUser/queryOne', {
                    id: param.data.code
                }).then(data => {
                    this.modal.userData = this.$store.getters.tidyEmployee(data.data);
                })
            }
        },
        mounted() {
            this.getTreeMapData().then(data => {
                const tree = echarts.init(document.getElementById('tree'), 'macarons');
                tree.on('click', this.treeClick);

                tree.setOption({
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