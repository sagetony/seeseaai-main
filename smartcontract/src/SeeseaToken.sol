// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/token/ERC20/ERC20.sol";
import "@openzeppelin/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/access/Ownable.sol";
import "./interfaces/IUniswapV2.sol";

/**
 * @title SeeseaToken Contract
 * @dev This is SeeseaToken ERC20 token contract with pausable, and ownable features.
 */

contract SeeseaToken is ERC20, ERC20Pausable, Ownable {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

    IUniswapV2Router02 public uniswapV2Router;
    address public weth;
    address public uniswapV2Pair;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Constructor that initializes the contract with the initial owner and mint tokens to the initial owner
     * @param initialOwner The initial owner of the contract.
     */
    constructor(
        address initialOwner
    ) ERC20("Seesea Token", "SSAI") Ownable(msg.sender) {
        transferOwnership(initialOwner);
        _mint(initialOwner, 95_000_000 * 10 ** decimals());
        _mint(msg.sender, 5_000_000 * 10 ** decimals());
    }

    function createPool() external onlyOwner {
        uniswapV2Router = IUniswapV2Router02(
            0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
        );

        weth = uniswapV2Router.WETH();
        uniswapV2Pair = IUniswapV2Factory(uniswapV2Router.factory()).createPair(
                address(this),
                weth
            );
    }

    /**
     * @dev Burns a specified amount of tokens from a user's balance.
     * Only callable by the owner of the contract.
     * @param user The address of the user from whose balance the tokens will be burned.
     * @param amount The amount of tokens to be burned.
     */
    function burn(address user, uint256 amount) external onlyOwner {
        _burn(user, amount);
    }

    /**
     * @dev Mints a specified amount of tokens to a user's balance.
     * Only callable by the owner of the contract.
     * @param user The address of the user to whom the tokens will be minted.
     * @param amount The amount of tokens to be minted.
     */
    function mint(address user, uint256 amount) external onlyOwner {
        _mint(user, amount);
    }

    /**
     * @dev Pauses all token transfers.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Overrides the ERC20 _transfer function.
     * @param from The address from which tokens are transferred.
     * @param to The address to which tokens are transferred.
     * @param from The address from which tokens are transferred.
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Pausable) whenNotPaused {
        super._update(from, to, value);
    }
}
