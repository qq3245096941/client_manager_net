<template>
    <div class="content">
        <div class="form">
            <h1 style="text-align: center">登录</h1>
            <Divider />
            <Form ref="loginRules" :model="loginForm" :rules="loginRules">
                <FormItem label="账号" prop="username">
                    <Input v-model="loginForm.username" placeholder="手机号"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="loginForm.password" password></Input>
                </FormItem>
                <FormItem>
                    <Button :loading="loading" long type="primary" @click="submit('loginRules')">登录</Button>
                </FormItem>
            </Form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loading: false,
                loginForm: {
                    username: '',
                    password: '',
                },
                loginRules: {
                    username: [
                        {
                            required: 'true',
                            message: '请输入账号'
                        }
                    ],
                    password: [
                        {
                            required: 'true',
                            message: '请输入密码'
                        }
                    ],
                }
            }
        },
        methods: {
            submit(name) {
                this.loading = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('/login/login', this.loginForm, 'post').then(data => {
                            /*提交user到仓库*/
                            if(data.succeed===1){
                                this.$store.commit('setUser', data.data);
                                this.loading = false;
                                this.$router.push({path: '/AllClient'});
                                window.location.reload();
                            }else{
                                this.$Message.error(data.message);
                                this.loading = false;
                            }
                        })
                    } else {
                        this.$Message.error('登录失败');
                        this.loading = false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        background: #17233d;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url("../assets/back.png");
        background-size: 100%;
    }

    .form {
        border-radius: 20px;
        margin: 150px auto;
        padding: 20px;
        background: rgba(255, 255, 255, 0.39);
        width: 360px;
        box-shadow: 1px 2px 10px #6b3d3b;
    }
</style>