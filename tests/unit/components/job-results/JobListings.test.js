import { render, screen } from "@testing-library/vue";
import { flushPromises } from "@vue/test-utils";
import axios from "axios";

import JobListings from "@/components/job-results/JobListings.vue";

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn().mockResolvedValue({ data: Array(15).fill({}) }),
    },
  };
});

describe("JobListings", () => {
  it("fetches jobs", () => {
    render(JobListings);
    expect(axios.get).toBeCalledWith("http://localhost:3000/jobs");
  });

  it("creates a job listing for every job", async () => {
    render(JobListings);

    // Wait for updated data from axios.get
    await flushPromises();

    expect(screen.getAllByRole("listitem")).toHaveLength(15);
  });
});
