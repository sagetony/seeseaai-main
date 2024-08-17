/* eslint-disable react/prop-types */
import { useState } from 'react';
import { btnspan } from '../../assets';
import WalletModal from '../modal/WalletModal';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
const ConnectWallet = ({ className, imgClassName }) => {
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  return (
    <button
      className={className}
      //   data-aos='zoom-in'
      onClick={() => open()}
      //   data-aos-duration='1000'
    >
      <>
        {isConnected
          ? `${address.substring(0, 6)}...${address.substring(
              address.length - 4
            )}`
          : 'Connect Wallet'}
        <span className="absolute right-4 top-2">
          <img src={btnspan} className={imgClassName} />
        </span>
      </>
    </button>
  );
};

export default ConnectWallet;
