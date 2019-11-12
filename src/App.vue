<template>
    <div class="layout">
        <login v-if="user===''"></login>
        <Layout :style="{minHeight: '100vh'}" v-else>
            <Sider collapsible :collapsed-width="78">
                <Menu theme="dark" width="auto" accordion>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="md-menu" />
                            统计分析
                        </template>
                        <MenuItem name="1-1" to="/SkillStat">技能分析</MenuItem>
                        <MenuItem name="1-2" to="/EmployeeStat">客户统计</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="md-contact" />
                            客户管理
                        </template>
                        <MenuItem name="2-1" to="/AllClient">所有客户</MenuItem>
                        <MenuItem name="2-2" to="/AddClient">添加客户</MenuItem>
                        <MenuItem name="2-3" to="/AllClass">所有等级</MenuItem>
                        <MenuItem name="2-4" to="/AddClass">添加等级</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="md-bookmark" />
                            标签管理
                        </template>
                        <MenuItem name="4-1" to="/AllLabel">所有标签</MenuItem>
                        <MenuItem name="4-2" to="/AddLabel">添加标签</MenuItem>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-people" />
                            员工管理
                        </template>
                        <MenuItem name="5-1" to="/AllEmployee">所有员工</MenuItem>
                        <MenuItem name="5-2" to="/AddEmployee">添加员工</MenuItem>
                        <MenuItem name="5-3" to="/RoleManager">角色管理</MenuItem>
                        <MenuItem name="5-4" to="/DepartmentManager">部门管理</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header style="background: #fff;border-bottom: 1px solid #d2d2d2">
                    <Row>
                        <Col span="12">
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="30"/>
                                {{user.realName}}<Button @click="quitLogin" type="text">退出登录</Button>
                        </Col>
                        <Col span="12" style="text-align: right">
                            <Icon type="md-notifications-outline" size="24"></Icon>
                            <Badge :count="100" style="top: -10px;right: 10px"></Badge>
                        </Col>
                    </Row>
                </Header>
                <Content style="padding: 16px;height: 100px;overflow: auto">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import login from './views/login'

    export default {
        name:'App',
        components:{
            login
        },
        methods:{
            quitLogin(){
                this.$store.commit('setUser','');
            }
        }
    }
</script>

<style>
    .layout {
        height: 100%;
        width: 100%;
        position: absolute;
        overflow: hidden;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
