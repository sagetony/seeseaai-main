// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/access/Ownable.sol";
import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";

/**
 * @title StakingContract
 * @dev A contract for staking tokens and earning rewards based on staking duration and annual yield rates.
 */
contract Staking is Ownable {
    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          ERRORS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    error Staking_FailedTransaction();
    error Staking_AmountCannotBeZero();
    error Staking_StakingNotOver();
    error Staking_InvalidStakeIndex();
    error Staking_StakingNotWithdrawable();
    error Staking_RewardsCompleted();

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          STORAGE                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    IERC20 public token;
    uint32 constant SECONDS_IN_A_DAY = 86400;
    uint16 constant DAYS_IN_A_YEAR = 360;

    uint256 public totalStakedToken;
    uint256 public totalRewardDistributed;

    address private tokenowner;

    struct Stake {
        uint256 amount;
        uint32 startTimestamp;
        uint256 period;
        uint256 annualYieldRate;
        bool withdrawn;
        uint256 lastClaimTimestamp;
        uint256 expectedRewardTimestamp;
        uint256 expectedRewards;
        uint256 accumulatedRewards;
    }

    mapping(address => Stake[]) public stakes;
    mapping(uint256 => uint256) public stakingLimits;
    mapping(uint256 => uint256) public stakingaprs;
    mapping(uint256 => uint256) public earlyWithdrawalPenalties;
    mapping(address => bool) public hasActiveStake;

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                          EVENTS                           */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    event TokensStaked(
        address indexed user,
        uint256 amount,
        uint256 period,
        uint256 annualYieldRate
    );
    event RewardsClaimed(address indexed user, uint256 amount);
    event StakeWithdrawn(address indexed user, uint256 amount);
    event EarlyWithdrawal(
        address indexed user,
        uint256 amount,
        uint256 penalty
    );
    event TokensBurned(address indexed user, uint256 amount);

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                        CONSTRUCTOR                         */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Constructor sets the token address and initializes staking limits and penalties.
     * @param _token Address of the ERC20 token used for staking.
     * @param _tokenowner Token owner.

     */
    constructor(IERC20 _token, address _tokenowner) Ownable(msg.sender) {
        transferOwnership(_tokenowner);

        token = _token;
        tokenowner = _tokenowner;

        stakingLimits[30] = (type(uint256).max / 10 ** 18) * 10 ** 18;
        stakingLimits[60] = (type(uint256).max / 10 ** 18) * 10 ** 18;
        stakingLimits[90] = 10000 * 10 ** 18;
        stakingLimits[180] = 5000 * 10 ** 18;
        stakingLimits[360] = 5000 * 10 ** 18;
        stakingLimits[720] = 2000 * 10 ** 18;

        earlyWithdrawalPenalties[90] = 10; // 10%
        earlyWithdrawalPenalties[180] = 20; // 20%
        earlyWithdrawalPenalties[360] = 30; // 30%
        earlyWithdrawalPenalties[720] = 50; // 50%

        stakingaprs[30] = 10; // 10%
        stakingaprs[60] = 15; // 15%
        stakingaprs[90] = 20; // 20%
        stakingaprs[180] = 50; // 50%
        stakingaprs[360] = 100; // 100%
        stakingaprs[720] = 300; // 300%
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*              PUBLIC / EXTERNAL VIEW FUNCTIONS              */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Stakes tokens for a specified period.
     * @param _amount Amount of tokens to stake.
     * @param _period Staking period in days.
     */
    function stakeTokens(uint256 _amount, uint256 _period) external {
        if (_amount == 0) revert Staking_AmountCannotBeZero();
        require(
            _period == 30 ||
                _period == 60 ||
                _period == 90 ||
                _period == 180 ||
                _period == 360 ||
                _period == 720,
            "Invalid staking period"
        );

        require(
            _amount <= stakingLimits[_period],
            "Exceeds staking limit for the period"
        );
        require(
            !hasActiveStake[msg.sender],
            "You already have an active stake"
        );

        hasActiveStake[msg.sender] = true;
        totalStakedToken += _amount;

        uint256 _expectedRewards = calculateEarnings(
            _amount,
            stakingaprs[_period],
            _period
        );
        uint256 _expectedRewardTimestamp = block.timestamp +
            (_period * SECONDS_IN_A_DAY);
        stakes[msg.sender].push(
            Stake({
                amount: _amount,
                startTimestamp: uint32(block.timestamp),
                period: _period,
                annualYieldRate: stakingaprs[_period],
                withdrawn: false,
                lastClaimTimestamp: block.timestamp,
                expectedRewardTimestamp: _expectedRewardTimestamp,
                accumulatedRewards: 0,
                expectedRewards: _expectedRewards
            })
        );

        emit TokensStaked(msg.sender, _amount, _period, stakingaprs[_period]);

        bool success = token.transferFrom(msg.sender, address(this), _amount);
        if (!success) revert Staking_FailedTransaction();
    }

    /**
     * @dev Claims rewards for a specific stake after a period.
     * Rewards can be claimed immediately, and locked tokens can be withdrawn after the staking period.
     * @param stakeIndex Index of the stake in the stakes array.
     */
    function claimRewards(uint256 stakeIndex) external {
        if (stakeIndex >= stakes[msg.sender].length)
            revert Staking_InvalidStakeIndex();
        Stake storage stake = stakes[msg.sender][stakeIndex];
        uint256 currentTime = block.timestamp;

        if (
            currentTime >=
            stake.startTimestamp + (stake.period * SECONDS_IN_A_DAY)
        ) {
            _claimTokens(stakeIndex);
        } else {
            _claimRewards(stakeIndex);
        }
    }

    function _claimRewards(uint256 stakeIndex) internal {
        if (stakeIndex >= stakes[msg.sender].length)
            revert Staking_InvalidStakeIndex();
        Stake storage stake = stakes[msg.sender][stakeIndex];
        if (stake.withdrawn) revert Staking_StakingNotWithdrawable();

        uint256 currentTime = block.timestamp;
        if (currentTime < stake.lastClaimTimestamp + 30 days)
            revert Staking_StakingNotOver();

        uint256 earnings = calculateEarnings(
            stake.amount,
            stake.annualYieldRate,
            30
        );

        if (stake.accumulatedRewards >= stake.expectedRewards)
            revert Staking_RewardsCompleted();

        stake.accumulatedRewards += earnings;
        totalRewardDistributed += earnings;
        stake.lastClaimTimestamp = block.timestamp;

        emit RewardsClaimed(msg.sender, earnings);

        bool success = token.transfer(msg.sender, earnings);
        if (!success) revert Staking_FailedTransaction();
    }

    function _claimTokens(uint256 stakeIndex) internal {
        if (stakeIndex >= stakes[msg.sender].length)
            revert Staking_InvalidStakeIndex();
        Stake storage stake = stakes[msg.sender][stakeIndex];
        if (stake.withdrawn) revert Staking_StakingNotWithdrawable();

        uint256 currentTime = block.timestamp;
        if (
            currentTime <
            stake.startTimestamp + (stake.period * SECONDS_IN_A_DAY)
        ) revert Staking_StakingNotOver();

        if (stake.accumulatedRewards >= stake.expectedRewards)
            revert Staking_RewardsCompleted();

        uint256 remainingearning = stake.expectedRewards -
            stake.accumulatedRewards;
        uint256 lockedAmount = stake.amount;
        uint256 totalAmount = lockedAmount + remainingearning;

        stake.accumulatedRewards += remainingearning;
        totalRewardDistributed += remainingearning;
        totalStakedToken -= lockedAmount;
        hasActiveStake[msg.sender] = false;
        stake.amount = 0;
        stake.withdrawn = true;

        emit RewardsClaimed(msg.sender, totalAmount);

        bool success = token.transfer(msg.sender, totalAmount);
        if (!success) revert Staking_FailedTransaction();
    }

    /**
     * @dev Allows early withdrawal of staked tokens with a penalty.
     * @param stakeIndex Index of the stake in the stakes array.
     */
    function earlyWithdrawal(uint256 stakeIndex) private {
        if (stakeIndex >= stakes[msg.sender].length)
            revert Staking_InvalidStakeIndex();
        Stake storage stake = stakes[msg.sender][stakeIndex];
        if (stake.withdrawn) revert Staking_StakingNotWithdrawable();

        uint256 penaltyRate = earlyWithdrawalPenalties[stake.period];
        uint256 penalty = (stake.amount * penaltyRate) / 100;
        uint256 amountAfterPenalty = stake.amount - penalty;

        stake.withdrawn = true;
        token.transfer(msg.sender, amountAfterPenalty);
        token.transfer(address(0), penalty); // Burn the penalty

        emit EarlyWithdrawal(msg.sender, amountAfterPenalty, penalty);
    }

    /**
     * @dev Reduces tokens from a user's stake.
     * @param _user Address of the user whose tokens will be burned.
     * @param _amount Amount of tokens to burn.
     */
    function burnTokens(
        address _user,
        uint256 _amount,
        uint256 stakeIndex
    ) external onlyOwner {
        if (_amount == 0) revert Staking_AmountCannotBeZero();
        Stake storage stake = stakes[_user][stakeIndex];
        uint256 newamount = stake.amount - _amount;
        uint256 newexpectedEarning = calculateEarnings(
            newamount,
            stake.annualYieldRate,
            stake.period
        );

        stake.amount -= _amount;
        totalStakedToken -= _amount;
        stake.expectedRewards = newexpectedEarning;
        emit TokensBurned(_user, _amount);
    }

    /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
    /*                   INTERNAL/private FUNCTIONS               */
    /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
    /**
     * @dev Calculates earnings based on the staked amount, annual yield rate, and time elapsed.
     * @param _amount Amount of staked tokens.
     * @param _timeElapsed Time elapsed since last calculation or stake.
     * @return Earnings calculated based on the inputs.
     */
    function calculateEarnings(
        uint256 _amount,
        uint256 _timeElapsed,
        uint256 annualYieldRate
    ) internal pure returns (uint256) {
        return
            (_amount * annualYieldRate * _timeElapsed) / (DAYS_IN_A_YEAR * 100);
    }

    /**
     * @dev Get the stake of a user.
     * @param _index Index of the stake.
     * @return It returns the stake.
     */
    function getStake(uint256 _index) public view returns (Stake memory) {
        return stakes[msg.sender][_index];
    }

    /**
     * @dev Get the stake count of a user.
     * @return Counts of the stake.
     */
    function getStakeCount() public view returns (uint256) {
        return stakes[msg.sender].length;
    }

    /**
     * @dev Get the recent stake index of a user.
     * @return Recent stake index.
     */
    function getRecentStakeIndex() public view returns (uint256) {
        require(stakes[msg.sender].length > 0, "No stakes found for the user");
        return stakes[msg.sender].length - 1;
    }
}
