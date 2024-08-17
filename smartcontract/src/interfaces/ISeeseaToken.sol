// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

interface ISeeseaToken {
    function burn(address user, uint256 amount) external;

    function mint(address user, uint256 amount) external;

    function createPool() external;
}
