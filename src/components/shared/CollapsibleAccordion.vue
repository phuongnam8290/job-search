<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="toggle"
    >
      <h3 class="text-base font-semibold"> {{ header }} </h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div
      v-if="isOpen"
      class="mt-5 w-full"
    >
      <slot>No data</slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() => (isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]));
</script>

<style scoped></style>
