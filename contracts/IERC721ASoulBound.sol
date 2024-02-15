// SPDX-License-Identifier: MIT
// Creator: SecuX
pragma solidity ^0.8.24;

import "erc721a-upgradeable/contracts/IERC721AUpgradeable.sol";

/**
 * @dev Interface of ERC721ASoulBound.
 */
interface IERC721ASoulBound is IERC721AUpgradeable {
    /**
     * A Soulbound token cannot be transferred.
     */
    error SoulboundTokenCannotBeTransferred();
}
