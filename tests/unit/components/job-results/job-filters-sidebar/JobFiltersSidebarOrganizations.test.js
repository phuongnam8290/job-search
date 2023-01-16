import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";

import { useJobsStore, UNIQUE_ORGANIZATIONS } from "@/stores/jobs";
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from "@/stores/user";
import JobFiltersSidebarOrganizations from "@/components/job-results/job-filters-sidebar/JobFiltersSidebarOrganizations.vue";

describe("JobFiltersSidebarOrganizations", () => {
  it("renders unique list of organizations from jobs", async () => {
    render(JobFiltersSidebarOrganizations);

    const store = useJobsStore();
    store[UNIQUE_ORGANIZATIONS] = new Set(["Google", "Amazon"]);

    const button = screen.getByRole("button", { name: /organization/i });
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole("listitem");
    const organizations = organizationListItems.map((node) => node.textContent);

    expect(organizations).toEqual(["Google", "Amazon"]);
  });

  describe("when user click checkbox", () => {
    it("communicates that user has selected checkbox for organizations", async () => {
      render(JobFiltersSidebarOrganizations);

      const jobsStore = useJobsStore();
      const userStore = useUserStore();
      jobsStore[UNIQUE_ORGANIZATIONS] = new Set(["Google", "Amazon"]);

      const button = screen.getByRole("button", { name: /organization/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);

      expect(userStore[ADD_SELECTED_ORGANIZATIONS]).toBeCalledWith(["Google"]);
    });

    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      render(JobFiltersSidebarOrganizations);

      const jobsStore = useJobsStore();
      jobsStore[UNIQUE_ORGANIZATIONS] = new Set(["Google", "Amazon"]);

      const button = screen.getByRole("button", { name: /organization/i });
      await userEvent.click(button);

      const googleCheckbox = screen.getByRole("checkbox", {
        name: /google/i,
      });
      await userEvent.click(googleCheckbox);

      const router = useRouter();
      expect(router.push).toBeCalledWith({ name: "JobResults" });
    });
  });
});
