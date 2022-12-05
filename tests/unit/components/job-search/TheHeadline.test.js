import { render, screen } from "@testing-library/vue";
import TheHeadline from "@/components/job-search/TheHeadline.vue";
import { nextTick } from "vue";

describe("TheHeadline", () => {
  it("display introductory action verb", () => {
    render(TheHeadline);

    const actionPhase = screen.getByRole("heading", {
      name: /build for everyone/i,
    });

    expect(actionPhase).toBeInTheDocument();
  });

  it("changes action verb at a consistent interval", () => {
    const stubSetInterval = vi.fn();
    vi.stubGlobal("setInterval", stubSetInterval);

    render(TheHeadline);
    expect(stubSetInterval).toHaveBeenCalled();
  });

  it("swap action verb after interval", async () => {
    vi.useFakeTimers();
    render(TheHeadline);
    vi.advanceTimersToNextTimer();

    await nextTick();
    const actionPhase = screen.getByRole("heading", {
      name: /create for everyone/i,
    });

    expect(actionPhase).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("remove interval when component unmounted", () => {
    const stubClearInterval = vi.fn();
    vi.stubGlobal("clearInterval", stubClearInterval);

    const component = render(TheHeadline);
    component.unmount();

    expect(stubClearInterval).toHaveBeenCalled();
  });
});
