import {
  merc,
  bnb2,
  reload,
  usd,
  Logo,
  usdc,
  usdt,
  bnb,
} from '../../../assets';
import Icons from '../../../components/Icon/Icon';
import { useState } from 'react';
import ConnectWallet from '../../../components/Button/ConnectWallet';
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { toast } from 'sonner';

import SeeseaPurchaseContractFile from '../../../abis/SeeseaPurchaseToken.sol/SeeseaPurchaseToken.json';
import usdcContractFile from '../../../abis/DummyERC20.sol/DummyERC20.json';
const SeeseaPurchaseContractAddress =
  '0x0B6b64e404fa4558343D1cd5f958a9Be05a7e73C';
const SeeseaPurchaseContractAbi = SeeseaPurchaseContractFile.abi;
const usdtContractAddress = '0x55d398326f99059fF775485246999027B3197955';
const usdcContractAddress = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d';

const TPHero = () => {
  const [val, setVal] = useState(0);
  const [val2, setVal2] = useState(0.23452);
  const [selectedCurrency, setSelectedCurrency] = useState('BNB');
  const [selectedIcon, setSelectedIcon] = useState(bnb);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const currencies = [
    { name: 'BNB', icon: bnb },
    { name: 'USDT', icon: usdt },
    { name: 'USDC', icon: usdc },
  ];

  const handleSelect = (currency, icon) => {
    setSelectedCurrency(currency);
    setSelectedIcon(icon);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const amount = val;
    const currency = selectedCurrency;
    if (!isConnected) toast.error('User disconnected');

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = ethersProvider.getSigner();

    // The Contract object
    const SeeseaPurchaseContract = new ethers.Contract(
      SeeseaPurchaseContractAddress,
      SeeseaPurchaseContractAbi,
      signer
    );
    const USDTContract = new ethers.Contract(
      usdtContractAddress,
      usdcContractFile.abi,
      signer
    );
    const USDCContract = new ethers.Contract(
      usdcContractAddress,
      usdcContractFile.abi,
      signer
    );

    const _amount = ethers.utils.parseUnits(amount, 'ether');
    try {
      let tx;

      if (currency == 'BNB') {
        // const gasLimit = 200000; // Add some buffer to the gas estimate
        // const gasPrice = await ethersProvider.getGasPrice(); // Get the current gas price
        tx = await SeeseaPurchaseContract.buyWithBNB({ value: _amount });
      } else if (currency == 'USDT' && amount >= 0.05) {
        const approveTx = await USDTContract.approve(
          SeeseaPurchaseContractAddress,
          _amount
        );
        await approveTx.wait();

        tx = await SeeseaPurchaseContract.buyWithOtherTokens(
          usdtContractAddress,
          _amount
        );
      } else if (currency == 'USDC' && amount >= 0.05) {
        const approveTx = await USDCContract.approve(
          SeeseaPurchaseContractAddress,
          _amount
        );
        await approveTx.wait();

        tx = await SeeseaPurchaseContract.buyWithOtherTokens(
          usdcContractAddress,
          _amount
        );
      } else {
        toast.error(`Purchasing with ${currency} is not implemented yet`);
      }

      const receipt = await tx.wait();

      if (receipt.status === 1) {
        toast.success('Purchase successful');
      }
    } catch (error) {
      toast.error(`Transaction failed: ${error.error.message}`);
    }
  };
  return (
    <div className="pt-36">
      <div className="px-5 md:px-20">
        <h2
          className="text-white font-extrabold text-3xl mb-2 md:text-5xl"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Buy Crypto
        </h2>
        <p
          className="text-slate-300 font-[300] text-xl "
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Buy crypto in just a few clicks
        </p>
        <br />
        <p
          className="text-slate-100 font-[100]"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          SeeseaAI Token Address:
          <br />
          0x0B6b64e404fa4558343D1cd5f958a9Be05a7e73C
        </p>
        {/* <form onSubmit={handleSubmit}> */}
        <div className="rounded-xl bg-cards1 p-5  md:p-8 mt-10 text-white">
          <div
            className={`bg-[#010E35] rounded-[17px] relative ${
              openDropdown ? 'mb-8' : 'mb-8'
            } `}
            // data-aos='fade-up'
            // data-aos-duration='1000'
          >
            <input
              className="w-full bg-[#010E35] rounded-[17px] hover:ring-2 outline-none px-3 md:px-6 text-xl font-[300] py-4"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
            <div className="absolute flex justify-between items-center top-4 md:top-3 right-3 gap-3 md:gap-5">
              <Icons
                icon="pepicons-pencil:line-y"
                className="md:text-4xl text-3xl text-white "
              />
              <div
                className="flex justify-between cursor-pointer items-center md:gap-5 gap-3"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <img src={selectedIcon} className="md:w-8 w-6 md:h-8 h-6" />
                <p className="md:text-2xl text-xl">{selectedCurrency}</p>
                <Icons
                  icon="ooui:down-triangle"
                  className="md:text-2xl text-xl"
                />{' '}
              </div>
            </div>{' '}
            {openDropdown && (
              <div className="absolute z-50 right-0 w-[200px] rounded-lg bg-hbtn2 py-3">
                {currencies.map((curr, i) => (
                  <p
                    key={i}
                    className="flex items-center gap-5 hover:bg-white px-3 py-1 hover:text-[#010e35] cursor-pointer"
                    onClick={() => {
                      handleSelect(curr.name, curr.icon);
                      setOpenDropdown(false);
                    }}
                  >
                    <img src={curr.icon} className="md:w-7 w-5 md:h-7 h-5" />
                    <p className="md:text-xl text-xl">{curr.name}</p>
                  </p>
                ))}
              </div>
            )}
          </div>

          <div
            className="bg-[#010E35] rounded-[17px] relative mb-8"
            data-aos="fade-up"
            data-aos-duration="1400"
          >
            <input className="w-full bg-[#010E35] rounded-[17px] hover:ring-2 outline-none px-6 text-xl font-[300] py-4" />
            <div className="absolute flex justify-between gap-2 md:gap-5 items-center top-4 md:top-3 left-3">
              <img
                src={Logo}
                className="md:w-8 w-6 md:h-8 h-6 sm:block hidden"
              />
              <p className="md:text-2xl text-xl sm:block hidden">SSAI</p>
              <p className="font-[200] md:text-xl ">1 SSAI=$0.05</p>
            </div>
            <div className="absolute flex justify-between items-center top-3 right-3 gap-2 md:gap-4">
              <Icons
                icon="pepicons-pencil:line-y"
                className="md:text-4xl text-3xl text-white "
              />
              <div className="bg-[#009BF3] md:px-2 px-1 py-1 rounded-md flex items-center">
                <p className="text-xs md:text-[16px]">Best price</p>
                <Icons icon="hugeicons:flash" />
              </div>
              <Icons
                icon="ooui:down-triangle"
                className="md:text-2xl text-xl"
              />
            </div>
          </div>
          <div
            className="flex justify-center items-center mb-16"
            data-aos="fade-up"
            data-aos-duration="1600"
          >
            <div className="flex bg-[#010E35] items-center gap-3 rounded-[12px] px-6 py-1">
              <img src={bnb2} className="w-8 h-8" />{' '}
              <p className="text-lg font-[200] ">Binance Smart Chain</p>
            </div>
          </div>

          <div className="flex justify-center gap-6 items-center">
            <ConnectWallet
              className="bg-hbtn hover:ring-2 py-3 mb-5 shadow-btns text-center px-20 pl-9 font-bold md:text-xl rounded-[20px] text-white relative"
              imgClassName="md:w-10 md:h-10 w-8 h-8"
            />
            {isConnected ? (
              <button
                onClick={handleSubmit}
                className="bg-hbtn hover:ring-2 py-3 mb-5 shadow-btns relative text-center px-14 font-bold md:text-xl rounded-[20px] text-white "
                //   data-aos='zoom-in'
                //   data-aos-duration='1000'
                // onClick={handleRewardModalClick}
              >
                Buy
              </button>
            ) : null}
          </div>
          <div className=" " data-aos="fade-up" data-aos-duration="1200">
            <p className="text-slate-300 font-[300] text-xl text-center">
              By continuing you agree to our terms of service
            </p>
            <div className="flex items-center justify-end">
              <img
                src={reload}
                className="text-right cursor-pointer sm:block hidden -mt-8 w-10"
              />
            </div>
            {/* {modalOpen && <WalletModal onclose={closeWalletModal} />} */}
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default TPHero;
