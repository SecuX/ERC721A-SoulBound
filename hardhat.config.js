const dotenv = require("dotenv");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
dotenv.config();

const accounts = [
    process.env.OWNER_PRIVATE_KEY,
    process.env.ISSUER_PRIVATE_KEY
];

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
            accounts
        },
        mumbai: {
            url: "https://rpc.ankr.com/polygon_mumbai",
            accounts
        }
    }
};