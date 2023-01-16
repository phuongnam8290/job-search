import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

// import { useRoute } from "vue-router";
import { nextTick } from "vue";

import { useUserStore } from "@/stores/user";
import MainNav from "@/components/navigation/MainNav.vue";

describe("MainNav", () => {
  it("display company name", () => {
    render(MainNav);
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    render(MainNav);
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent);

    expect(navigationMenuTexts).toEqual(["Teams", "Locations", "Life at Bobo Corp", "How we hire", "Students", "Jobs"]);
  });

  describe("when the user logs in", () => {
    it("display user profile picture", async () => {
      render(MainNav);

      let profileImage = screen.queryByRole("img", {
        name: /User profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });

      await userEvent.click(loginButton);

      // Simulate isLoggedIn changing value after user click loginButton
      const userStore = useUserStore();
      userStore.isLoggedIn = true;

      // Wait until userStore state updated.
      await nextTick();

      profileImage = screen.getByRole("img", {
        name: /User profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
