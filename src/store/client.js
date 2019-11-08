export default {
    state: {
        cooperationStatus: {
            1: '合作成功',
            2: '开发中',
            3: '合作失败'
        }
    },
    getters: {
        tidyClient: (state) => (client) => {
            client.createTime = moment(client.createTime).format('YYYY年MM月DD日');
            client.lastReturnTime = client.lastReturnTime === null ? '暂无回访' : client.lastReturnTime;
            client.cooperationStatus = Reflect.get(state.cooperationStatus,client.cooperationStatus);
            return client;
        }
    }
}