import { render, screen } from "@testing-library/vue";

import ActionButton from "@/components/shared/ActionButton.vue";

describe("ActionButton", () => {
  beforeEach(() => {
    render(ActionButton, {
      props: {
        text: "Click me",
        type: "primary",
      },
    });
  });

  it("render text", () => {
    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("applies one of several styles to button", () => {
    const button = screen.getByRole("button", {
      name: /click me/i,
    });
    expect(button).toHaveClass("primary");
  });
});
