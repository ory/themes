// Copyright © 2023 Ory Corp
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  stories: [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  postCss: false,
}
