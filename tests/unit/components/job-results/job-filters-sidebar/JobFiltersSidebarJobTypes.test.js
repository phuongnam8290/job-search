import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";

import { useJobsStore, UNIQUE_JOB_TYPES } from "@/stores/jobs";
import { useUserStore, ADD_SELECTED_JOB_TYPES } from "@/stores/user";
import JobFiltersSidebarJobTypes from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
  it("renders unique list of job types from jobs", async () => {
    render(JobFiltersSidebarJobTypes);

    const store = useJobsStore();
    store[UNIQUE_JOB_TYPES] = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypeListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypeListItems.map((node) => node.textContent);

    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user click checkbox", () => {
    it("communicates that user has selected checkbox for job types", async () => {
      render(JobFiltersSidebarJobTypes);

      const jobsStore = useJobsStore();
      const userStore = useUserStore();
      jobsStore[UNIQUE_JOB_TYPES] = new Set(["Full-time", "Part-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fulltimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fulltimeCheckbox);

      expect(userStore[ADD_SELECTED_JOB_TYPES]).toBeCalledWith(["Full-time"]);
    });

    it("navigate user to job result page to see fresh batch of filtered jobs", async () => {
      render(JobFiltersSidebarJobTypes);

      const jobsStore = useJobsStore();
      jobsStore[UNIQUE_JOB_TYPES] = new Set(["Full-time", "Part-time"]);

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fulltimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fulltimeCheckbox);

      const router = useRouter();
      expect(router.push).toBeCalledWith({ name: "JobResults" });
    });
  });
});
