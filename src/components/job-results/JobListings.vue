<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <li v-for="job of displayedJobs" :key="job.id" class="mb-7">
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
import axios from "axios";

import JobListing from "@/components/job-results/JobListing.vue";

export default {
  name: "JobListings",
  components: {
    JobListing,
  },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
    previousPage() {
      const firstPage = 1;
      const previousPage = this.currentPage - 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    nextPage() {
      const lastPage = Math.ceil(this.jobs.length / 10);
      const nextPage = this.currentPage + 1;
      return nextPage <= lastPage ? nextPage : undefined;
    },
    displayedJobs() {
      const firstJobIndex = (this.currentPage - 1) * 10;
      const lastJobIndex = this.currentPage * 10;
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url = `${baseUrl}/jobs`;
    const response = await axios.get(url);

    this.jobs = response.data;
  },
};
</script>

<style scoped></style>
