import { render, screen } from "@testing-library/vue";
import SpotLight from "@/components/job-search/SpotLight.vue";
import axios from "axios";
import spotLight from "@/components/job-search/SpotLight.vue";
import { flushPromises } from "@vue/test-utils";

vi.mock("axios");
describe("SpotLight", () => {
  const mockSpotLightResponse = (spotLight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Some image",
          title: "Some title",
          description: "Some description",
          ...spotLight,
        },
      ],
    });
  };

  it("provide image to parent component", async () => {
    mockSpotLightResponse({ img: "Another image" });
    render(SpotLight, {
      slots: {
        default: `<template #default="{spotlight}">
          <h2>{{spotlight.img}}</h2>
        </template>`,
      },
    });

    // Wait for axios's response to resolved
    await flushPromises();
    expect(screen.getByText("Another image")).toBeInTheDocument();
  });

  it("provide title to parent component", async () => {
    mockSpotLightResponse({ title: "Another title" });
    render(SpotLight, {
      slots: {
        default: `<template #default="{spotlight}">
          <h2>{{spotlight.title}}</h2>
        </template>`,
      },
    });

    await flushPromises();
    expect(screen.getByText("Another title")).toBeInTheDocument();
  });

  it("provide description to parent component", async () => {
    mockSpotLightResponse({ description: "Another description" });
    render(SpotLight, {
      slots: {
        default: `<template #default="{spotlight}">
          <h2>{{spotlight.description}}</h2>
        </template>`,
      },
    });

    await flushPromises();
    expect(screen.getByText("Another description")).toBeInTheDocument();
  });
});
