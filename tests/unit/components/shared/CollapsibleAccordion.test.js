import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordion from "@/components/shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      props: {
        header: "My Category",
      },
      slots: {
        default: "<h3>My nested child</h3>",
      },
      ...config,
    });
  };

  it("render child content", async () => {
    renderCollapsibleAccordion({
      props: {
        header: "My Category",
      },
      slots: {
        default: "<h3>My nested child</h3>",
      },
    });

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /my category/i,
    });
    await userEvent.click(button);

    expect(screen.getByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent does not provide custom child content", () => {
    it("renders default content", async () => {
      renderCollapsibleAccordion({
        props: {
          header: "My Category",
        },
        slots: {},
      });

      const button = screen.getByRole("button", {
        name: /my category/i,
      });
      await userEvent.click(button);

      expect(screen.getByText("No data")).toBeInTheDocument();
    });
  });
});
