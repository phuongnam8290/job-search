import { createPinia, setActivePinia } from "pinia";
import { useUserStore, LOGIN_USER, ADD_SELECTED_ORGANIZATIONS } from "@/stores/user";

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
});

describe("action", () => {
  it("logs the user in", () => {
    const store = useUserStore();
    store[LOGIN_USER]();
    expect(store.isLoggedIn).toBe(true);
  });

  it("updates organizations the user has chosen to filter jobs by", () => {
    const store = useUserStore();
    store[ADD_SELECTED_ORGANIZATIONS](["Google", "Amazon"]);
    expect(store.selectedOrganizations).toEqual(["Google", "Amazon"]);
  });
});
