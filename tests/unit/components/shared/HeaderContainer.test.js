import { render, screen } from "@testing-library/vue";
import HeaderContainer from "@/components/shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  it("allows parent component to provide title content", () => {
    render(HeaderContainer, {
      slots: {
        title: "<h1>Some title</h1>",
      },
    });

    expect(screen.getByText("Some title")).toBeInTheDocument();
  });

  it("allows parent component to provide subtitle content", () => {
    render(HeaderContainer, {
      slots: {
        title: "<h3>Some subtitle</h3>",
      },
    });

    expect(screen.getByText("Some subtitle")).toBeInTheDocument();
  });
});
