<template>
    <Card>
		<p slot="title">
			<Breadcrumb>
				<BreadcrumbItem>客户管理</BreadcrumbItem>
				<BreadcrumbItem>添加客服</BreadcrumbItem>
			</Breadcrumb>
		</p>
        <Row>
            <Col span="12">
                <Form :label-width="80" :model="clientForm" :rules="clientRules">
                    <FormItem label="客户名称" prop="name">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="电话" prop="phone">
                        <Row>
                            <Col span="12">
                                <Input placeholder="手机号码"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="地址">
                        <Input placeholder="地址尽量详细些"></Input>
                    </FormItem>
                    <FormItem label="客户描述">
                        <Input type="textarea" :autosize="{minRows: 4,maxRows: 5}"></Input>
                    </FormItem>
                    <FormItem label="收入">
                        <Input></Input>
                    </FormItem>
                    <FormItem label="客户等级" prop="class">
                        <Row>
                            <Col span="12">
                                <Select>
                                    <Option></Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="合作状态" prop="cooperationState">
                        <Row>
                            <Col span="12">
                                <Select>
                                    <Option>开发中</Option>
                                    <Option>合作成功</Option>
                                    <Option>合作失败</Option>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="选择员工">
                        <Row>
                            <Col span="12">
                                <Select>
                                </Select>
                            </Col>
                        </Row>
                    </FormItem>
                    <!-- 提交 -->
                    <FormItem>
                        <Button type="primary">提交</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </Card>
</template>

<script>
    export default {
        name: "AddClient",
        data() {
            return {
                clientForm: {},
                clientRules: {
                    name: [
                        {
                            required: true,
                            message: '客户名称不能为空',
                            trigger: 'blur'
                        }
                    ],
                    phone: [
                        {
                            required: true,
							validator:this.$store.getters.validatePhone,
							trigger: 'blur'
                        }
                    ],
					class: [
						{
							required: true,
							message:'客户等级必须选择',
							trigger: 'blur'
						}
					],
					cooperationState:[
						{
							required:true,
							message:'合作状态不能为空',
							trigger: 'blur'
						}
					]
                }
            }
        }
    }
</script>

<style scoped>

</style>
