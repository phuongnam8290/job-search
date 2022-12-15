import { render, screen } from "@testing-library/vue";
import { nextTick } from "vue";
import { useJobsStore, FILTERED_JOBS_BY_ORGANIZATIONS } from "@/stores/jobs";

import TheSubnav from "@/components/navigation/TheSubnav.vue";

const renderSubnav = (routeName = "Home") => {
  render(TheSubnav, {
    global: {
      mocks: {
        $route: { name: routeName },
      },
    },
  });

  const jobsStore = useJobsStore();
  return { jobsStore };
};
describe("TheSubnav", () => {
  describe("when user is on jobs page", () => {
    it("displays job count", async () => {
      const { jobsStore } = renderSubnav("JobResults");
      const numberOfJobs = 16;
      jobsStore[FILTERED_JOBS_BY_ORGANIZATIONS] = Array(numberOfJobs).fill({});

      await nextTick();
      const jobCount = screen.getByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      const { jobsStore } = renderSubnav("Home");
      const numberOfJobs = 16;
      jobsStore[FILTERED_JOBS_BY_ORGANIZATIONS] = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
