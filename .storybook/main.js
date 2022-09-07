module.exports = {
  stories: [
    "../**/*.story.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-mantine",
    "storybook-dark-mode",
  ],
  framework: "@storybook/react",
};
