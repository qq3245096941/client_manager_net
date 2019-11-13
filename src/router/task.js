import SingleTask from "../views/task/SingleTask";
import GroupTask from "../views/task/GroupTask";
import TaskOverview from "../views/task/TaskOverview";

export default [
    {
        path: '/SingleTask',
        component: SingleTask
    },
    {
        path: '/GroupTask',
        component: GroupTask
    },
    {
        path: '/TaskOverview',
        component: TaskOverview
    }
]