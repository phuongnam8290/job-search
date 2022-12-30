import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import {
  useJobsStore, //
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
} from "@/stores/jobs";
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

  describe("UNIQUE_JOBS_TYPE", () => {
    it("finds unique job types from list of jobs", () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { jobType: "Full-time" }, //
        { jobType: "Part-time" },
        { jobType: "Full-time" },
      ];

      expect(jobsStore[UNIQUE_JOB_TYPES]).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organizations", () => {
      it("include job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const jobStore = useJobsStore();
        const job = { organization: "Google" };

        const result = jobStore[INCLUDE_JOB_BY_ORGANIZATION](job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];

      const jobStore = useJobsStore();
      const job = { organization: "Google" };

      const result = jobStore[INCLUDE_JOB_BY_ORGANIZATION](job);
      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job type", () => {
      it("include job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        const jobStore = useJobsStore();
        const job = { jobType: "Full-time" };

        const result = jobStore[INCLUDE_JOB_BY_JOB_TYPE](job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given job type", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];

      const jobStore = useJobsStore();
      const job = { jobType: "Full-time" };

      const result = jobStore[INCLUDE_JOB_BY_JOB_TYPE](job);
      expect(result).toBe(true);
    });
  });
});
