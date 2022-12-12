<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>
    <template #subtitle>
      <h3 class="my-4 w-full text-base font-light"> It's awesome working here. Why don't you come join us? </h3>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from "@/components/shared/HeaderContainer.vue";

export default {
  name: "TeamsView",
  components: {
    HeaderContainer,
  },
};
</script>

<style scoped></style>
