import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: require("./__mocks__/next/image.js"),
}));
