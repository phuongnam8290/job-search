import { render, screen } from "@testing-library/vue";

import { useJobsStore } from "@/stores/jobs";
import JobListings from "@/components/job-results/JobListings.vue";

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

beforeAll(() => {
  const jobsStore = useJobsStore();
  jobsStore.jobs = Array(15).fill({});
});

describe("JobListings", () => {
  it("fetches jobs", () => {
    renderJobListings();
    expect(useJobsStore().FETCH_JOBS).toHaveBeenCalled();
  });

  it("display maximum of 10 jobs", () => {
    renderJobListings({ page: "1" });
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
      renderJobListings({ page: "1" });
      expect(screen.queryByRole("link", { name: /previous/i })).not.toBeInTheDocument();
    });

    it("show link to next page", async () => {
      renderJobListings({ page: "1" });
      expect(screen.queryByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      renderJobListings({ page: "2" });
      expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
    });

    it("show link to previous page", async () => {
      renderJobListings({ page: "2" });
      expect(screen.queryByRole("link", { name: /previous/i })).toBeInTheDocument();
    });
  });
});
