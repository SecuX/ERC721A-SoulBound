const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = {
    default: buildModule(`sx${Date.now()}`, (m) => {
        const sbt = m.contractAt("ERC721ASoulBound", process.env.CONTRACT_ADDRESS);
        m.call(sbt, "setIssuer", [process.env.ISSUER_ADDRESS]);

        return { sbt };
    })
}