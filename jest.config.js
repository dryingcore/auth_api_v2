/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.(test|spec).ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
