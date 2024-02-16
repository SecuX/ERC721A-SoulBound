const dotenv = require("dotenv");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: '0.8.24',
        settings: {
            optimizer: {
                enabled: true,
                runs: 800,
            },
        },
    },
    networks: {
        sepolia: {
            url: "https://rpc.ankr.com/eth_sepolia",
            accounts: [process.env.OWNER_PRIVATE_KEY]
        },
        mumbai: {
            url: "https://rpc.ankr.com/polygon_mumbai",
            accounts: [process.env.OWNER_PRIVATE_KEY]
        }
    }
};