const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = {
    default: buildModule("SecuX_Identity", (m) => {
        const sbt = m.contractAt("ERC721ASoulBound", process.env.CONTRACT_ADDRESS);
        m.call(sbt, "setIssuer", [process.env.ISSUER_ADDRESS]);

        return { sbt };
    })
}