// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/token/ERC20/IERC20.sol";
import {Script} from "forge-std/Script.sol";
import {SeeseaToken} from "../src/SeeseaToken.sol";
import {SeeseaPurchaseToken} from "../src/SeeseaPurchaseToken.sol";
import {Staking} from "../src/Staking.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {console} from "forge-std/Test.sol";

contract DeploySeeSeaAI is Script {
    function run()
        external
        returns (SeeseaToken, SeeseaPurchaseToken, Staking, HelperConfig)
    {
        HelperConfig config = new HelperConfig();
        (
            address bnbUsdPriceFeed,
            uint256 deployerKey,
            address owner,
            address usdt,
            address usdc
        ) = config.activeNetworkConfig();

        vm.startBroadcast(deployerKey);
        SeeseaToken seeseatoken = new SeeseaToken(owner);

        SeeseaPurchaseToken seeseapurchasetoken = new SeeseaPurchaseToken(
            IERC20(seeseatoken),
            bnbUsdPriceFeed,
            address(usdt),
            address(usdc),
            owner
        );

        seeseatoken.transfer(address(seeseapurchasetoken), 5_000_000 ether);

        assert(
            seeseatoken.balanceOf(address(seeseapurchasetoken)) ==
                5_000_000 ether
        );

        Staking staking = new Staking(seeseatoken, owner);

        vm.stopBroadcast();
        return (seeseatoken, seeseapurchasetoken, staking, config);
    }
}
