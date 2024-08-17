// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import {Test, console} from "forge-std/Test.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import {SeeseaPurchaseToken} from "../src/SeeseaPurchaseToken.sol";
import {SeeseaToken} from "../src/SeeseaToken.sol";
import {DummyERC20} from "../test/mocks/DummyERC20.sol";
import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";

contract SeeseaPurchaseTest is Test {
    SeeseaPurchaseToken seeseapurchasetoken;
    SeeseaToken seeseatoken;
    MockV3Aggregator bnbUsdPriceFeed;
    DummyERC20 usdt;
    DummyERC20 usdc;

    address deployer = address(1);
    address tokenowner = address(2);
    address user = address(3);
    address userTwo = address(4);
    uint8 public constant DECIMALS = 8;
    int256 public constant BNB_USD_PRICE = 550e8;
    uint256 public constant USDT_PRECISION = 1e18;

    function setUp() external {
        usdt = new DummyERC20(18);
        usdc = new DummyERC20(18);
        usdt.transfer(user, 100 * USDT_PRECISION);
        usdt.transfer(userTwo, 100 * USDT_PRECISION);
        usdc.transfer(user, 100 * USDT_PRECISION);
        usdc.transfer(userTwo, 100 * USDT_PRECISION);

        assert(usdt.balanceOf(user) == 100 * USDT_PRECISION);
        assert(usdt.balanceOf(userTwo) == 100 * USDT_PRECISION);

        assert(usdc.balanceOf(user) == 100 * USDT_PRECISION);
        assert(usdc.balanceOf(userTwo) == 100 * USDT_PRECISION);

        bnbUsdPriceFeed = new MockV3Aggregator(DECIMALS, BNB_USD_PRICE);

        vm.startPrank(deployer);
        seeseatoken = new SeeseaToken(tokenowner);

        seeseapurchasetoken = new SeeseaPurchaseToken(
            IERC20(seeseatoken),
            address(bnbUsdPriceFeed),
            address(usdt),
            address(usdc),
            tokenowner
        );
        assert(seeseapurchasetoken.owner() == tokenowner);
        console.log(seeseapurchasetoken.owner(), tokenowner, deployer);
        seeseatoken.transfer(address(seeseapurchasetoken), 5_000_000 ether);
        assert(
            seeseatoken.balanceOf(address(seeseapurchasetoken)) ==
                5_000_000 ether
        );
        assert(seeseatoken.balanceOf(deployer) == 0);
        vm.stopPrank();

        vm.deal(user, 100 ether);
        vm.deal(userTwo, 100 ether);
    }

    function test_buyWithOtherTokens() external {
        vm.startPrank(user);
        uint256 amount = 10 * USDT_PRECISION;
        usdt.approve(address(seeseapurchasetoken), amount);
        seeseapurchasetoken.buyWithOtherTokens(address(usdt), amount);
        assert(seeseatoken.balanceOf(user) == 200 ether);
        assert(usdt.balanceOf(user) == 90 * USDT_PRECISION);

        vm.stopPrank();
    }

    function test_buyWithBNB() external {
        vm.startPrank(user);

        seeseapurchasetoken.buyWithBNB{value: 1 ether}();
        assert(seeseatoken.balanceOf(user) == 11000 ether);
        vm.stopPrank();
    }

    function test_withdrawBNB() external {
        vm.startPrank(user);
        seeseapurchasetoken.buyWithBNB{value: 1 ether}();
        assert(seeseatoken.balanceOf(user) == 11000 ether);
        vm.stopPrank();

        vm.startPrank(tokenowner);
        seeseapurchasetoken.withdrawBNB();
        assert(tokenowner.balance == 1 ether);
        vm.stopPrank();
    }

    function test_withdrawByOnlyOwner() external {
        vm.startPrank(user);
        seeseapurchasetoken.buyWithBNB{value: 1 ether}();
        assert(seeseatoken.balanceOf(user) == 11000 ether);
        vm.stopPrank();

        vm.startPrank(userTwo);
        vm.expectRevert();
        seeseapurchasetoken.withdrawBNB();
        vm.stopPrank();
    }

    function test_withdrawTokens() external {
        vm.startPrank(user);
        uint256 amount = 10 * USDT_PRECISION;
        usdt.approve(address(seeseapurchasetoken), amount);
        seeseapurchasetoken.buyWithOtherTokens(address(usdt), amount);
        assert(seeseatoken.balanceOf(user) == 200 ether);
        assert(usdt.balanceOf(user) == 90 * USDT_PRECISION);
        vm.stopPrank();

        vm.startPrank(tokenowner);
        seeseapurchasetoken.withdrawTokens(amount, address(usdt));
        assert(usdt.balanceOf(tokenowner) == amount);
        vm.stopPrank();
    }

    function test_withdrawTokensByOnlyOwner() external {
        vm.startPrank(user);
        uint256 amount = 10 * USDT_PRECISION;
        usdt.approve(address(seeseapurchasetoken), amount);
        seeseapurchasetoken.buyWithOtherTokens(address(usdt), amount);
        assert(seeseatoken.balanceOf(user) == 200 ether);
        assert(usdt.balanceOf(user) == 90 * USDT_PRECISION);
        vm.stopPrank();

        vm.startPrank(userTwo);
        vm.expectRevert();
        seeseapurchasetoken.withdrawTokens(amount, address(usdt));
        vm.stopPrank();
    }
}
