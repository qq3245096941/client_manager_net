import AllEmployee from "../views/employee/AllEmployee";
import AddEmployee from "../views/employee/AddEmployee";
import RoleManager from "../views/employee/RoleManager";

export default [
    {
        path: '/AllEmployee',
        component: AllEmployee
    },
    {
        path: '/AddEmployee',
        component: AddEmployee
    },
    {
        path:'/RoleManager',
        component:RoleManager
    }
]