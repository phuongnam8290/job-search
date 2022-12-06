import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/view/HomeView.vue";
import JobResultsView from "@/view/JobResultsView.vue";
import JobView from "@/view/JobView.vue";

// Modify the vue-router.d.ts or mark its as plain text to enable intellisense.

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
  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: JobView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
