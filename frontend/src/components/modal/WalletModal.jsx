/* eslint-disable react/prop-types */

import {
  bluebinance,
  btnspan,
  close,
  metamask,
  offbinance,
} from '../../assets';

const WalletModal = ({ onclose }) => {
  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };
  return (
    <div
      className='fixed backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-[9999px] top-0 left-0'
      onClick={handleModalOverlayClick}
    >
      <div className='bg-transparent max-h-[450px] overflow-auto text-white border border-slate-300 rounded-lg p-5 w-full md:w-1/2'>
        <div className='flex justify-between items-center mb-4'>
          <h5 className='font-bold text-xl'>Connect wallet</h5>
          <img src={close} onClick={onclose} className=' cursor-pointer w-8' />
        </div>
        <p className='text-slate-300 font-[300] w-3/4'>
          Start by connecting with one of the wallets below. Be sure to store
          your private keys or seed phrase securely. Never share them with
          anyone.
        </p>
        <div className='grid grid-cols-2 my-7 gap-9 px-8 md:grid-cols-4'>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={metamask} />
            <p className='text-center text-sm pt-1'>Metamask</p>
          </div>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={bluebinance} />
            <p className='text-center text-sm pt-1'>Binance Web3 wallet</p>
          </div>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={offbinance} />
            <p className='text-center text-sm pt-1'>Binance Web3 wallet</p>
          </div>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={offbinance} />
            <p className='text-center text-sm pt-1'>Binance Web3 wallet</p>
          </div>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={metamask} />
            <p className='text-center text-sm pt-1'>Metamask</p>
          </div>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={bluebinance} />
            <p className='text-center text-sm pt-1'>Binance Web3 wallet</p>
          </div>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={offbinance} />
            <p className='text-center text-sm pt-1'>Binance Web3 wallet</p>
          </div>
          <div className='border hover:bg-white hover:text-blue-950 cursor-pointer border-slate-300 rounded-md flex flex-col items-center p-3'>
            <img src={offbinance} />
            <p className='text-center text-sm pt-1'>Binance Web3 wallet</p>
          </div>
        </div>
        <h5 className='font-bold text-xl'>What’s a Web3 Wallet</h5>
        <p className='text-slate-300 font-[300]  '>
          A Web3 Wallet allows you to send and receive crypto assets like
          bitcoin, BNB,ETH,NFTs and much more.
        </p>{' '}
        <div className='flex justify-center items-center'>
          <button className='bg-hbtn mt-8 hover:ring-2 py-3 mb-5 shadow-btns text-center px-20 pl-9 font-bold md:text-xl rounded-[20px] text-white relative'>
            Learn How to Connect
            <span className='absolute right-4 top-2'>
              <img src={btnspan} className='md:w-10 md:h-10 w-8 h-8' />
            </span>
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
