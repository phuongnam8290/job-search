import { config } from "@vue/test-utils";
import { cleanup } from "@testing-library/vue";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";

// Globally stub Font Awesome component, using the underlying @vue/test-utils
config.global.stubs = {
  FontAwesomeIcon: true,
};

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
