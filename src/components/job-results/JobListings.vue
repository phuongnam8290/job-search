<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <li v-for="job of jobs" :key="job.id" class="mb-7">
        <job-listing :job="job" />
      </li>
    </ol>
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
  async mounted() {
    const url = "http://localhost:3000/jobs";
    const response = await axios.get(url);

    this.jobs = response.data;
  },
};
</script>

<style scoped></style>
