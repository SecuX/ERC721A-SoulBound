// SPDX-License-Identifier: MIT
// Creator: SecuX
pragma solidity ^0.8.24;

import "./IERC721ASoulBound.sol";
import "erc721a-upgradeable/contracts/extensions/ERC721ABurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract ERC721ASoulBound is ERC721ABurnableUpgradeable, OwnableUpgradeable {
    address private _issuer;

    constructor() {
        _issuer = msg.sender;
    }

    function initialize(
        string memory name,
        string memory symbol,
        address issuer
    ) public initializerERC721A initializer {
        // default owner is identical to `_issuer`.
        if (owner() == address(0)) {
            require(msg.sender == _issuer, "caller is not deployer");
        }

        __ERC721A_init(name, symbol);
        __Ownable_init();
        _issuer = issuer;
    }

    function issue(address user) public {
        _mint(user, 1);
    }

    function setIssuer(address issuer) public onlyOwner {
        _issuer = issuer;
    }

    /**
     * @dev Overrides _mint to make token minted from issuer only.
     *
     * Requirements:
     *
     * - The caller must be issuer.
     * - The quantity must be 1.
     * - The `to` address must not have token.
     */
    function _mint(address to, uint256 quantity) internal override {
        require(msg.sender == _issuer, "caller is not issuer");
        require(quantity == 1, "quantity must be 1");
        require(balanceOf(to) == 0, "address has already issued");

        super._mint(to, quantity);
    }

    /**
     * @dev Overrides _beforeTokenTransfers to make token non-transferable. The token is still burnable.
     *
     * Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function _beforeTokenTransfers(
        address from,
        address to,
        uint256,
        uint256
    ) internal virtual override {
        if (from != address(0)) {
            if (to != address(0)) {
                revert("SoulboundTokenCannotBeTransferred");
            }
        }
    }
}
