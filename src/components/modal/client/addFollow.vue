<!--添加跟进-->
<template>
    <Modal :value="content.isOpen" title="添加回访" @on-cancel="cancel" @on-ok="submit" :loading="loading">
        <Form :label-width="80">
            <FormItem label="备注">
                <Input v-model="desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
    export default {
        name: "addFollow",
        props:{
            content:{
                type:Object,
                required:true
            }
        },
        data(){
            return {
                desc:'',
                loading:false
            }
        },
        methods:{
            cancel(){
                this.content.isOpen = false;
                this.desc = '';
            },
            submit(){
                if(this.desc===''){
                    this.$Message.success('请填写备注');
                    this.loading = false;
                    return;
                }

                this.request('/returnVisitToRecord/insert',{
                    recordRemarks:this.desc,
                    clientCode:this.content.clientCode,
                    returnVisitToRecordStatus:3,
                    returnVisitToRecordType:1,
                    sysUserCode:this.user.userCode
                }).then(data=>{
                    this.$Message.success('添加成功');
                    this.content.isOpen = false;
                    this.desc = '';
                })
            }
        }
    }
</script>

<style scoped>

</style>