// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {SeeseaToken} from "../src/SeeseaToken.sol";

contract SeeseaTokenTest is Test {
    SeeseaToken seeseatoken;

    address deployer = address(1);
    address owner = address(2);

    function setUp() external {
        vm.startPrank(deployer);
        seeseatoken = new SeeseaToken(owner);
        assert(seeseatoken.owner() == owner);
        vm.stopPrank();
    }

    function test_deployerIsNotOwner() external view {
        assert(deployer != owner);
    }

    function test_checkOwnerBalance() external view {
        assert(seeseatoken.balanceOf(owner) == 95_000_000 ether);
    }

    function test_mint() external {
        vm.prank(owner);
        seeseatoken.mint(owner, 5_000_000 ether);
        assert(seeseatoken.balanceOf(owner) == 100_000_000 ether);
    }

    function test_burn() external {
        vm.prank(owner);
        seeseatoken.burn(owner, 5_000_000 ether);
        assert(seeseatoken.balanceOf(owner) == 90_000_000 ether);
    }
}
