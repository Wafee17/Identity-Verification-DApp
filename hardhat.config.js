require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    // Add configuration for testnet later
  },
  paths: {
    artifacts: './src/artifacts',
  },
};