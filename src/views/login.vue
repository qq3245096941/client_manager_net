<template>
    <div class="content">

        <Form ref="loginRules" :model="loginForm" :rules="loginRules" class="form">
            <h2 style="text-align: center">登录</h2>
            <Divider dashed/>
            <FormItem label="手机号" prop="username">
                <Input v-model="loginForm.username"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="loginForm.password" password></Input>
            </FormItem>
            <FormItem>
                <Button :loading="loading" long type="primary" @click="submit('loginRules')">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loading: false,
                loginForm: {
                    username: 'admin123',
                    password: 'admin123',
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
                            this.$store.commit('setUser',data.data);
                            this.loading = false;
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
    }

    .form {
        border-radius: 5px;
        margin: 100px auto;
        padding: 20px;
        background: #fff;
        width: 350px;
    }
</style>