import { config, RouterLinkStub } from "@vue/test-utils";
import { cleanup } from "@testing-library/vue";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";

import { useRouter, useRoute } from "vue-router";
vi.mock("vue-router");
useRouter.mockReturnValue({
  push: vi.fn(),
});
useRoute.mockReturnValue({ name: "Home" });

import { createTestingPinia } from "@pinia/testing";

// Using real pinia for testing
config.global.plugins = [createTestingPinia()];

// Stub global component, using the underlying @vue/test-utils
config.global.stubs = {
  FontAwesomeIcon: true,
  RouterLink: RouterLinkStub,
};

// Mock global instance properties
config.global.mocks = {
  $route: "",
};

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
