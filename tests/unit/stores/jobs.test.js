import { createPinia, setActivePinia } from "pinia";
import axios from "axios";
import { useJobsStore } from "@/stores/jobs";

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
