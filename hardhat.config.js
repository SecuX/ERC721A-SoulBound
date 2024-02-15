require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");

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
};