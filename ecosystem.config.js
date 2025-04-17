module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
