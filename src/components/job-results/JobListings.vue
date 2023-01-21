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

<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useJobsStore } from "@/stores/jobs";
import JobListing from "@/components/job-results/JobListing.vue";

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const router = useRouter();
const route = useRoute();

const lastPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));

const currentPage = computed(() => Number.parseInt(route.query.page) || 1);
watch(currentPage, (newPage) => {
  if (newPage > lastPage.value) {
    router.push({
      name: "JobResults",
      query: {
        page: lastPage.value,
      },
    });
  }
});

const previousPage = computed(() => {
  const firstPage = 1;
  const previousPage = currentPage.value - 1;
  return previousPage >= firstPage ? previousPage : undefined;
});

const nextPage = computed(() => {
  const nextPage = currentPage.value + 1;
  return nextPage <= lastPage.value ? nextPage : undefined;
});

const displayedJobs = computed(() => {
  const firstJobIndex = (currentPage.value - 1) * 10;
  const lastJobIndex = currentPage.value * 10;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
</script>

<style scoped></style>
