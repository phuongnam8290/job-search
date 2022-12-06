import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/view/HomeView.vue";
import JobResultsView from "@/view/JobResultsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
