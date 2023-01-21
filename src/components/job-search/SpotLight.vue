<template>
  <ol>
    <li
      v-for="spotlight of spotlights"
      :key="spotlight.id"
    >
      <slot :spotlight="spotlight"></slot>
    </li>
  </ol>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const spotlights = ref([]);
const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const response = await axios.get(`${baseUrl}/spotlights`);
  spotlights.value = response.data;
};

onMounted(getSpotlights);
</script>
