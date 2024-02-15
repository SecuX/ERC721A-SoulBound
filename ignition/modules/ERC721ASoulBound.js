const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = {
    default: buildModule("SecuX_Identity", (m) => {
        const sbt = m.contract("ERC721ASoulBound");
        m.call(sbt, "initialize", ["SecuXIdentity", "SXID", process.env.ISSUER]);

        return { sbt };
    })
}