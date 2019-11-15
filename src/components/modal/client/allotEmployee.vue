<template>
    <Modal :value="content.isOpen" title="分配员工" @on-cancel="cancel" @on-ok="submit" :loading="loading">
        <Form :label-width="80">
            <Row>
                <Col span="16">
                    <FormItem label="部门">
                        <Select v-model="selectDept">
                            <Option v-for="(dept,index) in deptList" :value="dept.departmentCode" :key="index">
                                {{dept.departmentName}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="员工">
                        <Select v-model="selectEmployee">
                            <Option v-show="employee.userType!==4" v-for="(employee,index) in employeeList"
                                    :value="employee.userCode" :key="index">
                                {{employee.realName}}
                            </Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </Modal>
</template>

<script>
    export default {
        name: "allotEmployee",
        props: {
            content: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                deptList: [],
                /*选中部门的员工*/
                employeeList: [],
                /*选中的部门*/
                selectDept: '',
                selectEmployee: '',
                loading: true
            }
        },
        watch: {
            /*监听选择部门，从而获取员工*/
            selectDept(val) {
                this.request('/sysUser/query', {
                    parentCode: val
                }).then(data => {
                    this.employeeList = data.data;
                })
            }
        },
        mounted() {
            this.request('/department/query').then(data => {
                this.deptList = data.data;
            })
        },
        methods: {
            cancel() {
                this.content.isOpen = false;
            },
            submit() {
                if (this.selectEmployee === '' || this.selectEmployee === undefined) {
                    this.$Message.error('未选择任何员工');
                    this.loading = false;
                    return;
                }

                this.request('/client/update', {
                    clientCode: this.content.clientCode,
                    sysUserCode: this.selectEmployee
                }).then(data => {
                    Reflect.set(this.content, 'isOpen', false);
                    this.$Message.success('修改成功');
                })
            }
        }
    }
</script>

<style scoped>

</style>