import Vue from 'vue'
import VueRouter from 'vue-router'

import client from "./client";
import label from "./label";
import employee from "./employee";
import statistics from "./statistics";
import task from "./task";

Vue.use(VueRouter);

const routes = [
    ...client,
    ...label,
    ...employee,
    ...statistics,
    ...task
];

const router = new VueRouter({
    routes
});

export default router
