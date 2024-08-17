/* eslint-disable react/prop-types */

import { close, gift, reward, share } from '../../assets';
import { useState, useEffect } from 'react';
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { toast } from 'sonner';

import StakingContractFile from '../../abis/Staking.sol/Staking.json';
import SeeseaTokenContractFile from '../../abis/SeeseaToken.sol/SeeseaToken.json';
const StakingContractAddress = '0x18fC4b89769bC3b86E94617EeF331861175e9259';
const SeeseaTokenContractAddress = '0xa213bAf9900A3Bd23f5FCCA909Ced945112f6289';
const StakingContractAbi = StakingContractFile.abi;
const SeeseaTokenContractAbi = SeeseaTokenContractFile.abi;

const RewardModal = ({ onclose }) => {
  const [StakingContract, setStakingContractState] = useState(null);
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [SeeseaTokenContract, setSeeseaTokenContract] = useState(null);
  const [totalStaked, setTotalStaked] = useState(null);
  const [stake, setStake] = useState(null);
  const [claimTimestamp, setClaimTimestamp] = useState(null);
  const [nextClaimTimestamp, setNextClaimTimestamp] = useState(null);
  const [amountStaked, setAmountStaked] = useState(null);
  const [APR, setAPR] = useState(null);
  const [currentRewards, setcurrentRewards] = useState(null);
  const [expectedRewards, setexpectedRewards] = useState(null);
  const [accumulatedRewards, setaccumulatedRewards] = useState(null);

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };

  const handleClaim = async (event) => {
    event.preventDefault();
    try {
      if (!isConnected) toast.error('User disconnected');
      // const index = await StakingContract.getRecentStakeIndex();
      const tx = await StakingContract.claimRewards(0);
      await tx.wait();
      let receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success(`Transaction Successful`);
      }
    } catch (error) {
      toast.error(`Transaction failed: ${error.error.message}`);
      // Handle specific error codes
    }
  };
  useEffect(() => {
    if (isConnected) {
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();

      // The Contract object
      const StakingContractState = new ethers.Contract(
        StakingContractAddress,
        StakingContractAbi,
        signer
      );
      const SeeseaPurchaseContractState = new ethers.Contract(
        SeeseaTokenContractAddress,
        SeeseaTokenContractAbi,
        signer
      );

      setStakingContractState(StakingContractState);
      setSeeseaTokenContract(SeeseaPurchaseContractState);

      const fetchTotalStaked = async () => {
        try {
          const totalStaked = await StakingContractState.totalStakedToken();
          const stakeState = await StakingContractState.getStake(0);
          const total = ethers.utils.formatUnits(totalStaked, 18);
          const amountState = ethers.utils.formatUnits(stakeState.amount, 18);

          const aprstate = stakeState.annualYieldRate;
          const accumulatedRewardsState = stakeState.accumulatedRewards;
          const currentRewardsState = stakeState.currentRewards;
          const expectedRewardsState = ethers.utils.formatUnits(
            stakeState.expectedRewards,
            18
          );

          // Convert the timestamp to a human-readable date
          const date = new Date(stakeState.lastClaimTimestamp * 1000);
          const nextdate = new Date(stakeState.expectedRewardTimestamp * 1000);

          // Convert seconds to milliseconds
          const getLastClaimTimestampState = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const getNextClaimTimestampState = nextdate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          // calculate the reward
          let rewards =
            (amountState * stakeState.annualYieldRate * 30) / (360 * 100);

          setaccumulatedRewards(accumulatedRewardsState);
          setcurrentRewards(rewards);
          setexpectedRewards(expectedRewardsState);
          setAPR(aprstate);
          setClaimTimestamp(getLastClaimTimestampState);
          setNextClaimTimestamp(getNextClaimTimestampState);
          setAmountStaked(amountState);
          setTotalStaked(total);
          setStake(stakeState);
        } catch (error) {
          // setTotalStaked(0);
          console.error('Error fetching total staked tokens:', error);
        }
      };

      fetchTotalStaked();
    }
  }, [isConnected]);
  return (
    <div
      className="fixed backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-[999px] top-0 left-0"
      onClick={handleModalOverlayClick}
    >
      <div className="bg-transparent md:max-h-[450px] max-h-[600px] overflow-auto text-white border border-slate-300 rounded-lg p-5 w-full md:w-2/3">
        <div className="flex items-start flex-col md:flex-row mb-6 justify-between">
          <img src={reward} className="w-11 h-11 " />
          <div className="font-[300] w-[80%]">
            <p className="gap-4 flex items-end text-sm mb-4">
              <span className="font-bold text-2xl"> SSAI Reward/Yield</span>EARN
              SSAI MONTHLY
            </p>
            <p>From SSAI pool rewards and revenue sharing!</p>
          </div>
          <img
            src={close}
            onClick={onclose}
            className=" cursor-pointer w-8 md:block hidden"
          />
          <img
            src={close}
            onClick={onclose}
            className=" cursor-pointer w-8 md:hidden block absolute right-7"
          />
        </div>
        <div className="bg-[#010E35] rounded-[17px] md:mx-14">
          <div className="bg-reward shadow-cards1 flex items-center gap-5 justify-center py-6 rounded-[10px] text-xl">
            MY SSAI{' '}
            <span className="text-4xl font-bold">
              {' '}
              {amountStaked !== null ? `${amountStaked}` : '0'}
            </span>
          </div>
          <div className="py-10 md:px-20 px-10 text-slate-300">
            <p className="flex justify-between items-center mb-3 font-bold">
              <span className="font-normal underline">Expected Rewards</span>
              {expectedRewards !== null ? `${expectedRewards}` : '0'}
            </p>
            <p className="flex justify-between items-center mb-3 font-bold">
              <span className="font-normal underline">Next distribution</span>
              30 days
              {/* {nextClaimTimestamp !== null ? `${nextClaimTimestamp}` : '0'} */}
            </p>
            <p className="flex justify-between items-center mb-3 font-bold">
              <span className="font-normal underline">Last distribution</span>
              {claimTimestamp !== null ? `${claimTimestamp}` : '0'}
            </p>
            <p className="flex justify-between items-center mb-3  ">
              <span className="font-normal underline">APR</span>
              {APR !== null ? `${APR}%` : '0'}
            </p>
            <p className="font-bold mb-3">SSAI POOL</p>
            <p className="font-bold flex justify-between items-center mb-3 ">
              <span className="font-bold font-normal underline">
                Claimable Rewards
              </span>
              {currentRewards !== null ? `${currentRewards}SSAI` : '0'}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-10 items-center">
          <button
            onClick={handleClaim}
            className="bg-hbtn md:w-[270px] hover:ring-2 py-2 shadow-btns relative text-center px-14 pl-5 font-bold md:text-lg rounded-[20px] text-white "
          >
            Claim Reward
            <span className="absolute right-4 top-2">
              <img src={gift} className="md:w-6 md:h-6 w-5 h-5" />
            </span>
          </button>{' '}
          <button className=" bg-none relative md:w-[270px] hover:ring-2 py-2  border border-slate-400  text-center px-10   font-bold md:text-lg rounded-[20px] text-white ">
            Learn
            <span className="absolute right-4 top-2">
              <img src={share} className="md:w-6 md:h-6 w-5 h-5" />
            </span>
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default RewardModal;
