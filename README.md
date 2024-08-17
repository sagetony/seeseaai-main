# Seesea Token Project

## Overview

The Seesea Token Project is a decentralized application that includes the following features:
- Creation of an ERC-20 token named "Seesea".
- Staking functionality for Seesea tokens.
- Purchase of Seesea tokens.
- A frontend built with React to interact with the smart contracts.

## Smart Contracts

### SeeseaToken

The `SeeseaToken` contract is an ERC-20 token contract that allows for the creation and management of the Seesea tokens.

### StakingContract

The `StakingContract` allows users to stake their Seesea tokens and earn rewards.

#### Contract Methods

- `stake(uint256 amount)`: Stakes a specified amount of Seesea tokens.
- `claimRewards()`: Claims the staking rewards.

### PurchaseContract

The `SeeseaPurchaseContract` allows users to purchase Seesea tokens.

#### Contract Methods

- Purchase: Allows users to purchase Seesea tokens. Users send BNB, USDT, USDC, and in return, they receive Seesea tokens.

## Frontend

The frontend is built with React and allows users to interact with the Seesea Token smart contracts.

### Features

- Display Seesea token balance.
- Stake Seesea tokens.
- Unstake Seesea tokens.
- Claim staking rewards.
- Purchase Seesea tokens.
