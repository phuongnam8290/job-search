import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useJobsStore, UNIQUE_ORGANIZATIONS, FILTERED_JOBS_BY_ORGANIZATIONS } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

vi.mock("axios");
beforeEach(() => {
  setActivePinia(createPinia());
});
describe("state", () => {
  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  it("makes API request and stores received jobs", async () => {
    axios.get.mockResolvedValue({ data: ["job1", "job2"] });
    const store = useJobsStore();
    await store.FETCH_JOBS();
    expect(store.jobs).toEqual(["job1", "job2"]);
  });
});

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
        { organization: "Facebook" },
      ];

      expect(store[UNIQUE_ORGANIZATIONS]).toEqual(new Set(["Google", "Amazon", "Facebook"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with the given organizations", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: "Google" },
        { organization: "Facebook" },
        { organization: "Microsoft" },
        { organization: "Amazon" },
      ];

      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];

      const filteredJobs = jobsStore[FILTERED_JOBS_BY_ORGANIZATIONS];
      expect(filteredJobs).toEqual([
        { organization: "Google" }, //
        { organization: "Microsoft" },
      ]);
    });

    describe("when the user has not selected any organizations", () => {
      it("returns all job", () => {
        const jobs = [
          { organization: "Google" },
          { organization: "Facebook" },
          { organization: "Microsoft" },
          { organization: "Amazon" },
        ];

        const jobsStore = useJobsStore();
        jobsStore.jobs = jobs;

        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const filteredJobs = jobsStore[FILTERED_JOBS_BY_ORGANIZATIONS];
        expect(filteredJobs).toEqual(jobs);
      });
    });
  });
});
