import { render, screen } from "@testing-library/vue";
import { useRoute } from "vue-router";
import { nextTick } from "vue";
import { useJobsStore, FILTERED_JOBS } from "@/stores/jobs";

import TheSubnav from "@/components/navigation/TheSubnav.vue";

let jobsStore;
beforeAll(() => {
  jobsStore = useJobsStore();
});

describe("TheSubnav", () => {
  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      useRoute.mockReturnValue({ name: "JobResults" });
      render(TheSubnav);

      const numberOfJobs = 16;
      jobsStore[FILTERED_JOBS] = Array(numberOfJobs).fill({});

      // Wait for vue update after change FILTERED_JOBS data.
      await nextTick();
      const jobCount = screen.getByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      useRoute.mockReturnValue({ name: "Home" });
      render(TheSubnav);

      const numberOfJobs = 16;
      jobsStore[FILTERED_JOBS] = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
