import { render, screen } from "@testing-library/vue";
import { flushPromises } from "@vue/test-utils";
import axios from "axios";

import JobListings from "@/components/job-results/JobListings.vue";

// vi.mock("axios", () => {
//   return {
//     default: {
//       get: vi.fn().mockResolvedValue({ data: Array(15).fill({}) }),
//     },
//   };
// });

vi.mock("axios");

const createRoute = (queryParam = {}) => ({
  query: {
    page: "5",
    ...queryParam,
  },
});

const renderJobListings = (queryParam) => {
  render(JobListings, {
    global: {
      mocks: {
        $route: createRoute(queryParam),
      },
    },
  });
};

describe("JobListings", () => {
  it("fetches jobs", () => {
    axios.get.mockResolvedValue({});
    renderJobListings();

    expect(axios.get).toBeCalledWith("http://myfakeapi.com/jobs");
  });

  it("display maximum of 10 jobs", async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    renderJobListings({ page: "1" });

    // Wait for updated data from axios.get
    await flushPromises();

    expect(screen.getAllByRole("listitem")).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      renderJobListings({ page: undefined });
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when parans include page number", () => {
    it("displays page number", () => {
      renderJobListings({ page: "3" });
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      renderJobListings({ page: "1" });

      await flushPromises();
      expect(screen.queryByRole("link", { name: /previous/i })).not.toBeInTheDocument();
    });

    it("show link to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      renderJobListings({ page: "1" });

      await flushPromises();
      expect(screen.queryByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      renderJobListings({ page: "2" });

      await flushPromises();
      expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
    });

    it("show link to previous page", async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) });
      renderJobListings({ page: "2" });

      await flushPromises();
      expect(screen.queryByRole("link", { name: /previous/i })).toBeInTheDocument();
    });
  });
});
