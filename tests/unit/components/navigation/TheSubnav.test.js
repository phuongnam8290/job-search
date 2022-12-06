import { render, screen } from "@testing-library/vue";
import TheSubnav from "@/components/navigation/TheSubnav.vue";
describe("TheSubnav", () => {
  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      render(TheSubnav, {
        global: {
          mocks: {
            $route: { name: "JobResults" },
          },
        },
      });

      const jobCount = screen.getByText("1653");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      render(TheSubnav, {
        global: {
          mocks: {
            $route: { name: "Home" },
          },
        },
      });

      const jobCount = screen.queryByText("1653");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
