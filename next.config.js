const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design",
    "@rc-component",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number", // 오타 수정
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],

  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ["localhost"],
  },

  // src/pages 디렉토리로 경로 설정
  webpack(config) {
    config.resolve.modules.push(path.resolve("./src"));
    return config;
  },
};
