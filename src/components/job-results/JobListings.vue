<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <li
        v-for="job of displayedJobs"
        :key="job.id"
        class="mb-7"
      >
        <job-listing :job="job" />
      </li>
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from "@/components/job-results/JobListing.vue";
import { mapState, mapActions } from "pinia";
import { useJobsStore, FETCH_JOBS, FILTERED_JOBS_BY_ORGANIZATIONS } from "@/stores/jobs";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  computed: {
    ...mapState(useJobsStore, { FILTERED_JOBS_BY_ORGANIZATIONS }),
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
    previousPage() {
      const firstPage = 1;
      const previousPage = this.currentPage - 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const lastPage = Math.ceil(this[FILTERED_JOBS_BY_ORGANIZATIONS].length / 10);
      const nextPage = this.currentPage + 1;
      return nextPage <= lastPage ? nextPage : undefined;
    },
    displayedJobs() {
      const firstJobIndex = (this.currentPage - 1) * 10;
      const lastJobIndex = this.currentPage * 10;
      return this[FILTERED_JOBS_BY_ORGANIZATIONS].slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    await this[FETCH_JOBS]();
  },
  methods: {
    ...mapActions(useJobsStore, { FETCH_JOBS }),
  },
};
</script>

<style scoped></style>
