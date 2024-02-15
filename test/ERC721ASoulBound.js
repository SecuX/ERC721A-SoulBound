const { deployContract } = require("./helpers.js");
const { expect } = require("chai");

describe("ERC721ASoulBound", async function () {
    const contractName = "SecuXIdentity";
    const symbol = "SXID";

    beforeEach(async function () {
        const [owner, issuer, addr1, addr2] = await ethers.getSigners();
        this.owner = owner;
        this.issuer = issuer;
        this.addr1 = addr1;
        this.addr2 = addr2;

        this.erc721aSoulBound = await deployContract("ERC721ASoulBound");
    });

    describe("Initialize", function () {
        it("can initialize contract", async function () {
            await this.erc721aSoulBound.connect(this.owner).initialize(contractName, symbol, this.issuer.address);
        });

        it("cannot initialize again", async function () {
            await this.erc721aSoulBound.connect(this.owner).initialize(contractName, symbol, this.issuer.address)
            await expect(
                this.erc721aSoulBound.connect(this.owner).initialize(contractName, symbol, this.issuer.address)
            ).to.be.revertedWith("ERC721A__Initializable: contract is already initialized");
        });

        it("cannot initialize contract without deployer", async function () {
            await expect(
                this.erc721aSoulBound.connect(this.addr1).initialize(contractName, symbol, this.issuer.address)
            ).to.be.revertedWith("caller is not deployer");
        });
    });

    describe("Deployment", function () {
        beforeEach(async function () {
            await this.erc721aSoulBound.connect(this.owner).initialize(contractName, symbol, this.issuer.address);
        });

        it("can set issuer", async function () {
            await this.erc721aSoulBound.connect(this.owner).setIssuer(this.issuer.address)
        });

        it("cannot set issuer without owner", async function () {
            await expect(
                this.erc721aSoulBound.connect(this.issuer).setIssuer(this.issuer.address)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Issue", function () {
        beforeEach(async function () {
            await this.erc721aSoulBound.connect(this.owner).initialize(contractName, symbol, this.issuer.address);
        });

        it("can issue token", async function () {
            await this.erc721aSoulBound.connect(this.issuer).issue(this.addr1.address);
        });

        it("cannot issue multiple tokens", async function () {
            await this.erc721aSoulBound.connect(this.issuer).issue(this.addr1.address);
            await expect(
                this.erc721aSoulBound.connect(this.issuer).issue(this.addr1.address)
            ).to.be.revertedWith("address has already issued");
        });

        it("cannot issue token without issuer", async function () {
            await expect(
                this.erc721aSoulBound.connect(this.owner).issue(this.addr1.address)
            ).to.be.revertedWith("caller is not issuer");
        });

        it("can issue token (burnt before)", async function () {
            await this.erc721aSoulBound.connect(this.issuer).issue(this.addr1.address);
            await this.erc721aSoulBound.connect(this.addr1).burn(0);
            await this.erc721aSoulBound.connect(this.issuer).issue(this.addr1.address);
        });
    });

    describe("Transfer", function () {
        beforeEach(async function () {
            await this.erc721aSoulBound.connect(this.owner).initialize(contractName, symbol, this.issuer.address);
            await this.erc721aSoulBound.connect(this.issuer).issue(this.addr1.address);
        });

        it("cannot transfer token", async function () {
            await expect(
                this.erc721aSoulBound.connect(this.addr1).transferFrom(this.addr1.address, this.addr2.address, 0)
            ).to.be.revertedWith("SoulboundTokenCannotBeTransferred");
        });
    });

    describe("Burn", function () {
        beforeEach(async function () {
            await this.erc721aSoulBound.connect(this.owner).initialize(contractName, symbol, this.issuer.address);
            await this.erc721aSoulBound.connect(this.issuer).issue(this.addr1.address);
            await this.erc721aSoulBound.connect(this.issuer).issue(this.addr2.address);
        });

        it("can burn token", async function () {
            await this.erc721aSoulBound.connect(this.addr2).burn(1);
        });

        it("cannot burn token without owner", async function () {
            await expect(
                this.erc721aSoulBound.connect(this.addr2).burn(0)
            ).to.be.reverted;
        });
    });
});
