import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import TokenPurchase from './pages/Token/TokenPurchase';
import TokenStaking from './pages/Token/TokenStaking';
import Publish from './pages/Publish/Publish';
import HelpCenter from './pages/Help/HelpCenter';
import Allocation from './pages/Allocation/Allocation';
import Realese from './pages/Release/Realese';
import Dataset from './pages/Dataset/Dataset';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';

// 1. Get projectId
const projectId = '4baa35164d1dbe6e27e8b942ae4a0002';

// 2. Set chains
// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com',
// };

// const sepolia = {
//   chainId: 11155111,
//   name: 'Sepolia Testnet',
//   currency: 'SepoliaETH',
//   explorerUrl: ' https://sepolia.etherscan.io',
//   rpcUrl: 'https://sepolia.infura.io/v3/fb8a3fdc580f438f8b2f9f200d9fddc3',
// };
const bnb = {
  chainId: 56,
  name: 'BNB Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org',
};
const bnbtest = {
  chainId: 97,
  name: 'BSC Testnet',
  currency: 'BNB',
  explorerUrl: 'https://explorer.binance.org/smart-testnet',
  rpcUrl: 'https://bsc-testnet-rpc.publicnode.com',
};

// 3. Create a metadata object
const metadata = {
  name: 'SeeseaAI',
  description: 'SeeseaAI Website',
  url: 'https://seeseaai-main.vercel.app', // origin must match your domain & subdomain
};
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: false, // true by default
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [bnb, bnbtest],
  projectId,
  // enableAnalytics: true // Optional - defaults to your Cloud configuration
});

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/token-purchase" element={<TokenPurchase />} />
        <Route path="/token-staking" element={<TokenStaking />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/unlock-allocation" element={<Allocation />} />
        <Route path="/my-releases" element={<Realese />} />
        <Route path="/dataset" element={<Dataset />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
