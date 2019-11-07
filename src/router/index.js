import Vue from 'vue'
import VueRouter from 'vue-router'

import client from "./client";
import label from "./label";
import employee from "./employee";
import statistics from "./statistics";

Vue.use(VueRouter);

const routes = [
    ...client,
    ...label,
    ...employee,
    ...statistics
];

const router = new VueRouter({
    routes
});

export default router
