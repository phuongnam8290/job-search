import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import JobSearchForm from "@/components/job-search/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("when user submit form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      const push = vi.fn();
      render(JobSearchForm, {
        global: {
          mocks: {
            $router: { push },
          },
        },
      });

      const roleInput = screen.getByRole("textbox", {
        name: /role/i,
      });
      const locationInput = screen.getByRole("textbox", {
        name: /where?/i,
      });
      const searchButton = screen.getByRole("button", {
        name: /search/i,
      });

      await userEvent.type(roleInput, "Vue Developer");
      await userEvent.type(locationInput, "Dallas");
      await userEvent.click(searchButton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: { role: "Vue Developer", location: "Dallas" },
      });
    });
  });
});
