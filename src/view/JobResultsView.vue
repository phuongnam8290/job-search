<template>
  <div class="flex w-full flex-nowrap">
    <job-filters-sidebar />
    <job-listings />
  </div>
</template>

<script>
import JobFiltersSidebar from "@/components/job-results/job-filters-sidebar/JobFiltersSidebar.vue";
import JobListings from "@/components/job-results/JobListings.vue";

export default {
  name: "JobResultsView",
  components: {
    JobFiltersSidebar,
    JobListings,
  },
};
</script>

<style scoped></style>
