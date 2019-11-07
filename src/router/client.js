import AllClient from "../views/client/AllClient";
import AddClient from "../views/client/AddClient";
import AddClass from "../views/client/AddClass"
import AllClass from "../views/client/AllClass";

export default [
    {
        path: '/AllClient',
        component: AllClient
    },
    {
        path: '/AddClient',
        component: AddClient
    },
    {
        path: '/AddClass',
        component: AddClass
    },
    {
        path: '/AllClass',
        component: AllClass
    }
]