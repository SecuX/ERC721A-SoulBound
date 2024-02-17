const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = {
    default: buildModule(`sx${Date.now()}`, (m) => {
        const sbt = m.contractAt("ERC721ASoulBound", process.env.CONTRACT_ADDRESS);
        m.call(sbt, "issue", [process.env.ISSUER_ADDRESS],
            {
                from: {
                    type: "ACCOUNT",
                    accountIndex: 1,
                }
            }
        );

        return { sbt };
    })
}