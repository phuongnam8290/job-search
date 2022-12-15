import { defineStore } from "pinia";

export const LOGIN_USER = "LOGIN_USER";
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const useUserStore = defineStore("user", {
  state() {
    return {
      isLoggedIn: false,
      selectedOrganizations: [],
    };
  },
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations) {
      this.selectedOrganizations = organizations;
    },
  },
});
