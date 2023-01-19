import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";

import JobFiltersSidebarCheckboxGroup from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarCheckboxGroup.vue";

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createProps = (props = {}) => ({
    header: "Some header",
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });

  it("renders unique list of value", async () => {
    render(JobFiltersSidebarCheckboxGroup, {
      props: createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time", "Part-time"]),
      }),
    });

    const button = screen.getByRole("button", { name: /job types/i });
    await userEvent.click(button);

    const jobTypeListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypeListItems.map((node) => node.textContent);

    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user click checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const action = vi.fn();
      render(JobFiltersSidebarCheckboxGroup, {
        props: createProps({
          header: "Job Types",
          uniqueValues: new Set(["Full-time", "Part-time"]),
          action,
        }),
      });

      const button = screen.getByRole("button", { name: /job types/i });
      await userEvent.click(button);

      const fulltimeCheckbox = screen.getByRole("checkbox", {
        name: /full-time/i,
      });
      await userEvent.click(fulltimeCheckbox);

      expect(action).toBeCalledWith(["Full-time"]);
    });

    it("navigate user to job result page to see fresh batch of filtered jobs", async () => {
      render(JobFiltersSidebarCheckboxGroup, {
        props: createProps({
          header: "Job Types",
          uniqueValues: new Set(["Full-time", "Part-time"]),
        }),
      });

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
