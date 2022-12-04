import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  beforeEach(() => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  });

  it("display company name", () => {
    const companyName = screen.getByText("Bobo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent);

    expect(navigationMenuTexts).toEqual(["Teams", "Locations", "Life at Bobo Corp", "How we hire", "Students", "Jobs"]);
  });

  describe("when the user logs in", () => {
    it("display user profile picture", async () => {
      let profileImage = screen.queryByRole("img", {
        name: /User profile image/i,
      });
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /sign in/i,
      });
      await userEvent.click(loginButton);

      profileImage = screen.getByRole("img", {
        name: /User profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
