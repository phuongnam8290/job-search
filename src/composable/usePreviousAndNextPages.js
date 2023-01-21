import { computed } from "vue";

const usePreviousAndNextPages = (currentPage, lastPage) => {
  const previousPage = computed(() => {
    const firstPage = 1;
    const previousPage = currentPage.value - 1;
    return previousPage >= firstPage ? previousPage : undefined;
  });

  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage <= lastPage.value ? nextPage : undefined;
  });

  return { previousPage, nextPage };
};

export default usePreviousAndNextPages;
