require("dotenv").config();
const dev = {
  app: {
    port: process.env.PORT || 4000,
  },
};

module.exports = dev;
