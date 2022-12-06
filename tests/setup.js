import { config, RouterLinkStub } from "@vue/test-utils";
import { cleanup } from "@testing-library/vue";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";

// Stub global component, using the underlying @vue/test-utils
config.global.stubs = {
  FontAwesomeIcon: true,
  RouterLink: RouterLinkStub,
};

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
