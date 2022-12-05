import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TextInput from "@/components/shared/TextInput.vue";

describe("TextInput", () => {
  it("communicates that user has entered character", async () => {
    const wrapper = render(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = screen.getByRole("textbox", {});
    await userEvent.type(input, "NYC");
    const payload = wrapper.emitted()["update:modelValue"];

    expect(payload).toEqual([["N"], ["NY"], ["NYC"]]);
  });
});
