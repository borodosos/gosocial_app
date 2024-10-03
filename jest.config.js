module.exports = {
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "vuetify/lib(.*)": "<rootDir>/node_modules/vuetify/es5$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/?!axios|vue-router"],
};
