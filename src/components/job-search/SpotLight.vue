<template>
  <ol>
    <li v-for="spotlight of spotlights" :key="spotlight.id">
      <slot :spotlight="spotlight"></slot>
    </li>
  </ol>
</template>

<script>
import axios from "axios";

export default {
  name: "SpotLight",
  data() {
    return {
      spotlights: [],
    };
  },
  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const response = await axios.get(`${baseUrl}/spotlights`);
    this.spotlights = response.data;
  },
};
</script>
