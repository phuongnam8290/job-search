<template>
  <h1>Job Page for job id {{ currentJobId }}</h1>
</template>

<script>
export default {
  name: "JobView",
  computed: {
    currentJobId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped></style>
