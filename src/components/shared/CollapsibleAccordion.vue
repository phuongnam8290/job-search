<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div class="flex cursor-pointer flex-wrap items-center justify-between" role="button" @click="toggle">
      <h3 class="text-base font-semibold"> {{ header }} </h3>
      <font-awesome-icon :icon="carretIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <slot>No data</slot>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "CollapsibleAccordion",
  components: { FontAwesomeIcon },
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    carretIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped></style>
