// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import {DummyERC20} from "../test/mocks/DummyERC20.sol";
import {Script} from "forge-std/Script.sol";
import {Test, console} from "forge-std/Test.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address bnbUsdPriceFeed;
        uint256 deployerKey;
        address owner;
        address usdt;
        address usdc;
    }

    uint8 public constant DECIMALS = 8;
    int256 public constant BNB_USD_PRICE = 550e8;
    uint256 public DEFAULT_ANVIL_KEY =
        0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;

    NetworkConfig public activeNetworkConfig;
    address public MAINNET_USDT = 0x55d398326f99059fF775485246999027B3197955;
    address public MAINNET_USDC = 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d;
    address public TESTNET_USDT = 0x337610d27c682E347C9cD60BD4b3b107C9d34dDd;
    address public TESTNET_USDC = 0x64544969ed7EBf5f083679233325356EbE738930;

    constructor() {
        if (block.chainid == 56) {
            activeNetworkConfig = getBNBConfig();
        } else if (block.chainid == 97) {
            activeNetworkConfig = getBNBTestnetConfig();
        } else {
            activeNetworkConfig = getOrCreateAnvilBnbConfig();
        }
    }

    function getBNBConfig() public view returns (NetworkConfig memory) {
        return
            NetworkConfig({
                bnbUsdPriceFeed: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE,
                deployerKey: vm.envUint("PRIVATE_KEY"),
                owner: vm.envAddress("ADMIN_ADDRESS"),
                usdt: MAINNET_USDT,
                usdc: MAINNET_USDC
            });
    }

    function getBNBTestnetConfig() public returns (NetworkConfig memory) {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));
        console.log("bnbtestnet", block.chainid);

        DummyERC20 usdt = new DummyERC20(18);
        DummyERC20 usdc = new DummyERC20(18);

        console.log(
            "USDT CONTRACT ADDRESS",
            address(usdt),
            "USDC CONTRACT ADDRESS",
            address(usdc)
        );

        vm.stopBroadcast();

        return
            NetworkConfig({
                bnbUsdPriceFeed: 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526,
                deployerKey: vm.envUint("PRIVATE_KEY"),
                owner: vm.envAddress("ADMIN_ADDRESS"),
                usdt: address(usdt),
                usdc: address(usdc)
            });
    }

    function getOrCreateAnvilBnbConfig() public returns (NetworkConfig memory) {
        vm.startBroadcast();
        MockV3Aggregator bnbUsdPriceFeed = new MockV3Aggregator(
            DECIMALS,
            BNB_USD_PRICE
        );
        DummyERC20 usdt = new DummyERC20(18);
        DummyERC20 usdc = new DummyERC20(18);

        vm.stopBroadcast();

        return
            NetworkConfig({
                bnbUsdPriceFeed: address(bnbUsdPriceFeed),
                deployerKey: DEFAULT_ANVIL_KEY,
                owner: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
                usdt: address(usdt),
                usdc: address(usdc)
            });
    }
}
// $ forge deploy script/DeploySeesea.s.sol:DeploySeeSeaAI --rpc-url https://bsc-dataseed.bnbchain.org --etherscan-api-key FJMHUPUN5FYV67YVZRD555JWQIUIRISQDS --broadcast --verify

// forge script script/DeploySeesea.s.sol:DeploySeeSeaAI --rpc-url https://bsc-dataseed.nariox.org --etherscan-api-key FJMHUPUN5FYV67YVZRD555JWQIUIRISQDS --broadcast --verify
// forge script script/DeploySeesea.s.sol:DeploySeeSeaAI --rpc-url https://bsc-testnet-dataseed.bnbchain.org --etherscan-api-key FJMHUPUN5FYV67YVZRD555JWQIUIRISQDS --broadcast --verify
