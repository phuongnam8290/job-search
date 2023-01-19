<template>
  <div class="wrapper flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear filters"
            type="secondary"
          />
        </div>
      </div>

      <job-filters-sidebar-checkbox-group
        :action="userStore.ADD_SELECTED_JOB_TYPES"
        :unique-values="UNIQUE_JOB_TYPES"
        header="Job Types"
      />

      <job-filters-sidebar-checkbox-group
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
        :unique-values="UNIQUE_ORGANIZATIONS"
        header="Organizations"
      />
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/shared/ActionButton.vue";
import JobFiltersSidebarCheckboxGroup from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue";

const jobsStore = useJobsStore();
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);

const userStore = useUserStore();
</script>

<style scoped>
.wrapper {
  flex-basis: 24rem;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
