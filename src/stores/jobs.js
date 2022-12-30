import { defineStore } from "pinia";

import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";
export const FILTERED_JOBS = "FILTERED_JOBS";
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
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set();
      state.jobs.forEach((job) => {
        uniqueJobTypes.add(job.jobType);
      });

      return uniqueJobTypes;
    },
    [INCLUDE_JOB_BY_ORGANIZATION]() {
      return (job) => {
        const selectedOrganizations = useUserStore().selectedOrganizations;

        if (selectedOrganizations.length === 0) {
          return true;
        }

        return selectedOrganizations.includes(job.organization);
      };
    },
    [INCLUDE_JOB_BY_JOB_TYPE]() {
      return (job) => {
        const selectedJobTypes = useUserStore().selectedJobTypes;

        if (selectedJobTypes.length === 0) {
          return true;
        }

        return selectedJobTypes.includes(job.jobType);
      };
    },
    [FILTERED_JOBS](state) {
      return state.jobs
        .filter((job) => this[INCLUDE_JOB_BY_ORGANIZATION](job))
        .filter((job) => this[INCLUDE_JOB_BY_JOB_TYPE](job));
    },
  },
});
