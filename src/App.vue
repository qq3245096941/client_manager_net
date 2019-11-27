<template>
    <div class="layout">
        <login v-if="user===''"></login>
        <Layout :style="{minHeight: '100vh'}" v-else>
            <Sider collapsible :collapsed-width="78">
                <Menu theme="dark" :active-name="active" width="auto" accordion ref="menu" :open-names="open">
                    <Submenu v-show="parentMenu.isShow===1" v-for="(parentMenu,index) in menuList" :name="index"
                             :key="index">
                        <template slot="title">
                            <Icon :type="parentMenu.ext2"/>
                            {{parentMenu.menuName}}
                        </template>
                        <MenuItem v-show="childrenMenu.isShow===1"
                                  v-for="(childrenMenu,childIndex) in parentMenu.sonList"
                                  :name="index+'-'+childIndex"
                                  :to="childrenMenu.redirectUrl">{{childrenMenu.menuName}}
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header style="background: #fff;border-bottom: 1px solid #d2d2d2">
                    <Row>
                        <Col span="12">
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="30"/>
                            {{user.realName}}
                            <Button @click="quitLogin" type="text">退出登录</Button>
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
        name: 'App',
        components: {
            login
        },
        data() {
            return {
                currentPath: '',
                active: '', //选中的子菜单
                open: []  //展开的菜单，必须是数组
            }
        },
        computed:{
            /*获取菜单*/
            menuList(){
                return this.user.menuList;
            }
        },
        watch: {
            $route(to, from) {
                this.currentPath = to.path;
            },
            currentPath(path) {
                if (this.menuList === undefined) return;

                this.menuList.forEach((parent, parentIndex) => {
                    parent.sonList.forEach((children, childrenIndex) => {
                        if (children.redirectUrl === path) {
                            this.open = [parentIndex];
                            this.active = `${parentIndex}-${childrenIndex}`;
                        }
                    })
                });
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened();
                    this.$refs.menu.updateActiveName();
                });
            }
        },
        methods: {
            quitLogin() {
                this.$store.commit('setUser', '');
            }
        },
        mounted() {
            this.currentPath = this.$route.path;
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
