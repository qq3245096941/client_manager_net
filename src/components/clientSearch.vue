<!--客户搜索组件-->
<template>
    <Collapse value="1">
        <Panel name="1">
            <Icon type="md-search"/>
            搜索
            <p slot="content">
                <Alert type="success" show-icon>任意组合搜索选项，点击搜索即可。</Alert>
                <Row>
                    <Col span="9">
                        <Form :label-width="80" v-model="searchFrom">
                            <Row>
                                <Col span="12">
                                    <!--用户名-->
                                    <FormItem label="姓名">
                                        <Input v-model="searchFrom.name"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <!--用户名-->
                                    <FormItem label="电话" prop="phone">
                                        <Input v-model="searchFrom.phone"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <!--时间区间-->
                            <FormItem label="时间区间">
                                <Row>
                                    <Col span="11">
                                        <DatePicker type="date" name="startTime" placeholder="开始时间"
                                                    v-model="searchFrom.startTime"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <DatePicker type="date" name="endTime" placeholder="结束时间"
                                                    v-model="searchFrom.endTime"></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>

                            <!--分数区间-->
                            <FormItem label="分数区间">
                                <Row>
                                    <Col span="11">
                                        <Input placeholder="最小分数" v-model="searchFrom.minGrade"></Input>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <Input placeholder="最大分数" v-model="searchFrom.maxGrade"></Input>
                                    </Col>
                                </Row>
                            </FormItem>

                            <!--地址-->
                            <FormItem label="地址">
                                <Input placeholder="地址" v-model="searchFrom.address"></Input>
                            </FormItem>

                            <!--选择员工-->
                            <FormItem label="员工">
                                <Row>
                                    <Col span="11"><Select placeholder="选择部门" v-model="searchFrom.department"></Select></Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11"><Select placeholder="选择员工" v-model="searchFrom.employee"></Select></Col>
                                </Row>
                            </FormItem>

                            <!--地址-->
                            <FormItem label="等级">
                                <Col span="11"><Select v-model="searchFrom.class"></Select></Col>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col class="searchClass">
                        <Button type="success" @click="search">搜索</Button>
                    </Col>
                </Row>
            </p>
        </Panel>
    </Collapse>
</template>

<script>
    export default {
        name: "clientSearch",
        data(){
            return{
                searchFrom:{
                    name:'',
                    phone:'',
                    startTime:'',
                    minGrade:'',
                    maxGrade:'',
                    address:'',
                    department:'',
                    employee:'',
                    class:''
                }
            }
        },
        methods:{
            search(){
                this.$emit('search');
            }
        }
    }
</script>

<style scoped>
    .searchClass {
        position: absolute;
        right: 50%;
        bottom: 50%;
    }
</style>