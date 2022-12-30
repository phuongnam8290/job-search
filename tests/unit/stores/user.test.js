import { createPinia, setActivePinia } from "pinia";
import {
  useUserStore, //
  LOGIN_USER,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/stores/user";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("state", () => {
  it("keeps track of it user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });

  it("stores job types that the user would like to filter jobs by", () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });
});

describe("action", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useUserStore();
      store[LOGIN_USER]();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations the user has chosen to filter jobs by", () => {
      const store = useUserStore();
      store[ADD_SELECTED_ORGANIZATIONS](["Google", "Amazon"]);
      expect(store.selectedOrganizations).toEqual(["Google", "Amazon"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types the user has chosen to filter job by", () => {
      const userStore = useUserStore();
      userStore[ADD_SELECTED_JOB_TYPES](["full-time", "part-time"]);
      expect(userStore.selectedJobTypes).toEqual(["full-time", "part-time"]);
    });
  });
});
