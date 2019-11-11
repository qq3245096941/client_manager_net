export default {
    state: {
        userType: {
            1: '平台',
            2: '管理',
            3: '员工'
        }
    },
    getters: {
        tidyEmployee: (state) => (employee) => {
            employee.createTime = moment(employee.createTime).format('YYYY年MM月DD日');
            employee.userType = Reflect.get(state.userType, employee.userType);
            return employee;
        }
    }
}