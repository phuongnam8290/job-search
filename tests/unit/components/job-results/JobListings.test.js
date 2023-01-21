import { render, screen } from "@testing-library/vue";

import { useRoute } from "vue-router";
import { useJobsStore } from "@/stores/jobs";
import JobListings from "@/components/job-results/JobListings.vue";

beforeAll(() => {
  const jobsStore = useJobsStore();

  // Report incorrect error because Webstorm not realize pinia has been mock
  jobsStore.FILTERED_JOBS = Array(15).fill({});
});

describe("JobListings", () => {
  it("fetches jobs", () => {
    useRoute.mockReturnValue({ query: {} });
    render(JobListings);

    // Each call to the useJobsStore() result in the same instance
    expect(useJobsStore().FETCH_JOBS).toHaveBeenCalled();
  });

  it("display maximum of 10 jobs", () => {
    useRoute.mockReturnValue({ query: {} });
    render(JobListings);
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      useRoute.mockReturnValue({ query: {} });
      render(JobListings);
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when parans include page number", () => {
    it("displays page number", () => {
      useRoute.mockReturnValue({ query: { page: 3 } });
      render(JobListings);
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      useRoute.mockReturnValue({ query: { page: 1 } });
      render(JobListings);
      expect(screen.queryByRole("link", { name: /previous/i })).not.toBeInTheDocument();
    });

    it("show link to next page", async () => {
      useRoute.mockReturnValue({ query: { page: 1 } });
      render(JobListings);
      expect(screen.queryByRole("link", { name: /next/i })).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("does not show link to next page", async () => {
      useRoute.mockReturnValue({ query: { page: 2 } });
      render(JobListings);
      expect(screen.queryByRole("link", { name: /next/i })).not.toBeInTheDocument();
    });

    it("show link to previous page", async () => {
      useRoute.mockReturnValue({ query: { page: 2 } });
      render(JobListings);
      expect(screen.queryByRole("link", { name: /previous/i })).toBeInTheDocument();
    });
  });
});
