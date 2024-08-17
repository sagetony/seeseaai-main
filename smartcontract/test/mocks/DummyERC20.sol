// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {ERC20} from "@openzeppelin/token/ERC20/ERC20.sol";

/**
 * @title DummyERC20
 */
contract DummyERC20 is ERC20 {
    constructor(uint8 decimal) ERC20("USD DUMMY", "USDDUMMY") {
        _mint(msg.sender, 1_000_000 * 10 ** decimal);
    }
}
