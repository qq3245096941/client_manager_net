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
                                        <DatePicker type="datetime" name="startTime" placeholder="开始时间"
                                                    format="yyyy-MM-dd HH:mm:ss"
                                                    v-model="searchFrom.starDateTime"
                                                    @on-change="searchFrom.starDateTime=$event"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <DatePicker type="datetime" name="endTime" placeholder="结束时间"
                                                    format="yyyy-MM-dd HH:mm:ss"
                                                    v-model="searchFrom.endDateTime"
                                                    @on-change="searchFrom.endDateTime=$event"></DatePicker>
                                    </Col>
                                </Row>
                            </FormItem>

                            <!--分数区间-->
                            <FormItem label="分数区间">
                                <Row>
                                    <Col span="11">
                                        <Input placeholder="最小分数" v-model="searchFrom.scheduleStart"></Input>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <Input placeholder="最大分数" v-model="searchFrom.scheduleEnd"></Input>
                                    </Col>
                                </Row>
                            </FormItem>

                            <!--地址-->
                            <FormItem label="地址">
                                <Input placeholder="地址" v-model="searchFrom.address"></Input>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span="9">
                        <Form :label-width="80" v-model="searchFrom">
                            <!--选择部门-->
                            <FormItem label="选择部门">
                                <Row>
                                    <Col span="11">
                                        <Select placeholder="选择部门" v-model="searchFrom.departmentCode"
                                                :disabled="user.userType===2||user.userType===3">
                                            <Option v-show="user.userType===1" value="">所有部门</Option>
                                            <Option v-for="(dept,index) in deptAll" :key="index"
                                                    :value="dept.departmentCode">{{dept.departmentName}}
                                            </Option>
                                        </Select>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <Select placeholder="选择员工" v-model="searchFrom.sysUserCode"
                                                :disabled="user.userType===3">
                                            <Option value="">所有员工</Option>
                                            <Option v-for="(employee,index) in employeeList" :key="index"
                                                    :value="employee.userCode">
                                                {{employee.realName}}
                                            </Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </FormItem>
                            <!--选择等级-->
                            <FormItem label="等级">
                                <Col span="11">
                                    <Select v-model="searchFrom.lvCode">
                                        <Option value="">全部等级</Option>
                                        <Option v-for="(classObj,index) in classList" :kye="index"
                                                :value="classObj.lvCode">
                                            {{classObj.lvName}}
                                        </Option>
                                    </Select>
                                </Col>
                            </FormItem>

                            <!--选择等级-->
                            <FormItem label="客户状态">
                                <Col span="11">
                                    <Select v-model="searchFrom.cooperationStatus">
                                        <Option value="">全部状态</Option>
                                        <Option value="1">合作成功</Option>
                                        <Option value="2">开发中</Option>
                                        <Option value="3">合作失败</Option>
                                    </Select>
                                </Col>
                            </FormItem>
                        </Form>

                        <div style="text-align: center">
                            <Button style="display: inline" type="success" @click="search" :loading="isLoading">搜索
                            </Button>
                        </div>
                    </Col>
                </Row>
            </p>
        </Panel>
    </Collapse>
</template>

<script>
    export default {
        name: "clientSearch",
        data() {
            return {
                searchFrom: {
                    name: '',
                    phone: '',
                    starDateTime: '',
                    endDateTime: '',
                    scheduleStart: '',
                    scheduleEnd: '',
                    address: '',
                    departmentCode: '',
                    sysUserCode: '',
                    lvCode: '',
                    cooperationStatus: ''
                },
                /*是否加载中*/
                isLoading: false,
                /*所有部门*/
                deptAll: [],
                /*选择部门时，所在的员工*/
                employeeList: [],
                /*所有等级*/
                classList: []
            }
        },
        methods: {
            search() {
                this.isLoading = true;
                Reflect.set(this.searchFrom,'page',1);
                Reflect.set(this.searchFrom,'limit',1000000);
                this.request('/client/query', this.searchFrom).then(data => {
                    this.isLoading = false;
                    this.$Message.success(`搜索完成，总共搜索到${data.data.length}条数据`);
                    this.$emit('search', data);
                });
            }
        },
        watch: {
            /*监听部门的选择，获取部门的员工*/
            'searchFrom.departmentCode': {
                async handler(val) {
                    this.employeeList = (await this.request('/sysUser/query', {parentCode: val, userType: 3})).data;
                }
            }
        },
        async mounted() {
            this.request('/lv/query').then(data => {
                this.classList = data.data;
            });

            this.deptAll = (await this.request('/department/query')).data;

            switch (this.user.userType) {
                case 2:
                    this.searchFrom.departmentCode = this.user.parentCode;
                    break;
                case 3:
                    this.searchFrom.departmentCode = this.user.parentCode;
                    this.searchFrom.sysUserCode = this.user.userCode;
                    break;
                case 4:
                    this.deptAll = (await this.request('/department/query', {
                        sysUserCode: this.user.userCode,
                        type: 4
                    })).data;
                    break;

            }
        }
    }
</script>

<style scoped>

</style>