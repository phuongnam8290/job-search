<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li
            v-for="jobType of UNIQUE_JOB_TYPES"
            :key="jobType"
            class="h-8 w-1/2"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobTypes"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useJobsStore, UNIQUE_JOB_TYPES } from "@/stores/jobs";
import { useUserStore, ADD_SELECTED_JOB_TYPES } from "@/stores/user";

import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebarJobTypes",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, { UNIQUE_JOB_TYPES }),
  },
  methods: {
    ...mapActions(useUserStore, { ADD_SELECTED_JOB_TYPES }),
    selectJobTypes() {
      this[ADD_SELECTED_JOB_TYPES](this.selectedJobTypes);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>
