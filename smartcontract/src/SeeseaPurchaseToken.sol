// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "@openzeppelin/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/access/Ownable.sol";
import "@chainlink/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "./interfaces/IUniswapV2.sol";

/**
 * @title SeeseaToken
 * @dev Users can purchase tokens with BNB or supported tokens.
 */

contract SeeseaPurchaseToken is Ownable {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          ERRORS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error SeeseaToken_TokenNotSupported();
    error SeeseaToken_NotEnoughToken();
    error SeaseaToken_InsufficientFund();
    error SeeSeaToken__StalePrice();
    error SeeSeaToken_InvalidPrice();
    error SeeSeaToken_PriceBelowMinPrice();
    error SeeSeaToken_PurchaseHasEnded();
    error SeaseaToken_FailedTransaction();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    IERC20 public immutable seeSeaToken;
    AggregatorV3Interface internal bnbUsdPriceFeed;
    uint256 private constant TIMEOUT = 1 hours;
    uint256 public constant USDT_PRICE = 0.05 ether; // 0.05 USDT in smallest units (18 decimals)
    uint256 public constant SEE_SEA_AI_PRECISION = 1e18; // SEE_SEA_AI token precision (18 decimals)

    uint256 public totalPurchase;

    mapping(address => IERC20) public tokens;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    event PurchaseToken(address indexed user, uint256 amount);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        MODIFIER                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Modifier to check if the token is supported.
     * @param _token The address of the token to check.
     */
    modifier isSupported(address _token) {
        if (address(tokens[_token]) == address(0))
            revert SeeseaToken_TokenNotSupported();
        _;
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Constructor that initializes the contract with the initial owner, price feed address, and supported tokens.
     * @param _priceFeedAddress The address of the Chainlink price feed.
     * @param _usdc The address of the USDC token.
     * @param _usdt The address of the USDT token.
     */
    constructor(
        IERC20 _token,
        address _priceFeedAddress,
        address _usdc,
        address _usdt,
        address initialOwner
    ) Ownable(msg.sender) {
        transferOwnership(initialOwner);
        bnbUsdPriceFeed = AggregatorV3Interface(_priceFeedAddress);
        seeSeaToken = _token;

        // Store supported assets
        tokens[_usdc] = IERC20(_usdc);
        tokens[_usdt] = IERC20(_usdt);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*              PUBLIC / EXTERNAL VIEW FUNCTIONS              */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Allows users to purchase Seesea tokens using BNB.
     */
    function buyWithBNB() external payable {
        uint256 msgValueEquivalentUSDT = (msg.value * getBNBUSDTPrice()) / 1e18;

        uint256 msgValueEquivalentUSDTIn6Decimals = (msgValueEquivalentUSDT *
            1e18) / 1e8;

        if (msgValueEquivalentUSDTIn6Decimals < USDT_PRICE)
            revert SeeSeaToken_PriceBelowMinPrice();

        uint256 tokensToMint = (msgValueEquivalentUSDTIn6Decimals *
            SEE_SEA_AI_PRECISION) / USDT_PRICE;

        if (totalPurchase >= tokensToMint)
            revert SeeSeaToken_PurchaseHasEnded();
        if (tokensToMint > seeSeaToken.balanceOf(address(this)))
            revert SeaseaToken_InsufficientFund();

        totalPurchase += tokensToMint;

        bool success = seeSeaToken.transfer(msg.sender, tokensToMint);
        if (!success) revert SeaseaToken_FailedTransaction();

        emit PurchaseToken(msg.sender, tokensToMint);
    }

    /**
     * @dev Allows users to purchase Seesea tokens using supported tokens (e.g., USDT, USDC).
     * @param token The address of the supported token.
     * @param amount The amount of the supported token to spend.
     */
    function buyWithOtherTokens(
        address token,
        uint256 amount
    ) external isSupported(token) {
        if (amount < USDT_PRICE) revert SeeSeaToken_PriceBelowMinPrice();

        uint256 tokensToMint = (amount * SEE_SEA_AI_PRECISION) / USDT_PRICE;

        if (tokensToMint > seeSeaToken.balanceOf(address(this)))
            revert SeaseaToken_InsufficientFund();

        totalPurchase += tokensToMint;

        bool success = tokens[token].transferFrom(
            msg.sender,
            address(this),
            amount
        );
        if (!success) revert SeaseaToken_FailedTransaction();

        // Transfer tokens from owner to buyer
        bool positive = seeSeaToken.transfer(msg.sender, tokensToMint);

        if (!positive) revert SeaseaToken_FailedTransaction();

        emit PurchaseToken(msg.sender, tokensToMint);
    }

    /**
     * @dev Allows the owner to withdraw supported tokens from the contract.
     * @param amount The amount of the supported token to withdraw.
     * @param token The address of the supported token.
     */
    function withdrawTokens(
        uint256 amount,
        address token
    ) external onlyOwner isSupported(token) {
        if (amount > IERC20(token).balanceOf(address(this)))
            revert SeeseaToken_NotEnoughToken();

        IERC20(token).transfer(owner(), amount);
    }

    /**
     * @dev Allows the owner to withdraw BNB from the contract.
     */
    function withdrawBNB() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        if (!success) revert SeaseaToken_FailedTransaction();
    }

    /**
     * @dev Allows the owner to change BNB pricefeed.
     */
    function updateBnbPriceFeed(address _priceFeedAddress) external onlyOwner {
        bnbUsdPriceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    /**
     * @dev Retrieves the BNB price in USDT using the Chainlink price feed.
     * @return The BNB price in USDT with 18 decimals.
     */
    function getBNBUSDTPrice() public view returns (uint256) {
        (, int256 price, , uint256 updatedAt, ) = bnbUsdPriceFeed
            .latestRoundData();
        uint256 secondsSince = block.timestamp - updatedAt;

        if (price <= 0) revert SeeSeaToken_InvalidPrice();
        if (secondsSince > TIMEOUT) revert SeeSeaToken__StalePrice();

        return uint256(price);
    }

    /**
     * @dev Calculates the minimum BNB required for a purchase based on the current BNB price in USDT.
     * @return The minimum BNB required for a purchase.
     */
    function getMinBNBForPurchase() public view returns (uint256) {
        uint256 bnbPrice = getBNBUSDTPrice(); // BNB price in USDT with 18 decimals
        uint256 minUSDTAmountIn18Decimals = USDT_PRICE * 1e12; // Convert minUSDTAmount to 18 decimals
        uint256 minBNBAmount = (minUSDTAmountIn18Decimals * 1e18) / bnbPrice;
        return minBNBAmount;
    }

    /**
     * @dev Fallback function to receive BNB.
     */
    receive() external payable {}
}
