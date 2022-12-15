import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";
export const useJobsStore = defineStore("jobs", {
  state() {
    return {
      jobs: [],
    };
  },
  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs();
    },
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganization = new Set();
      state.jobs.forEach((job) => {
        uniqueOrganization.add(job.organization);
      });

      return uniqueOrganization;
    },
    [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
      const userStore = useUserStore();

      if (userStore.selectedOrganizations.length === 0) {
        return state.jobs;
      }

      return state.jobs.filter((job) => userStore.selectedOrganizations.includes(job.organization));
    },
  },
});
