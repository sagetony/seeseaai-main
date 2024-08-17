import { useState } from 'react';
import ComingSoon from '../../components/modal/ComingSoon';
import DSCards from './components/DSCards';
import DSHero from './components/DSHero';
import { heat, medical, traffic, blockchaintrend } from '../../assets';

const Dataset = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleComingSoonModalClick = () => {
    setModalOpen(!modalOpen);
  };

  const closeComingSoonModal = () => {
    setModalOpen(false);
  };

  const first_array = [
    'smart heat meters',
    'hourly data',
    'residential buildings',
    'energy consumption',
    'Danish homes',
    'smart home technology',
    'energy usage analysis',
    'heating patterns',
    'residential energy data',
    'three-year dataset',
    'building energy efficiency',
    'smart metering',
    'HVAC systems',
    'energy monitoring',
  ];

  const second_array = [
    'medical imaging',
    'annotated dataset',
    'X-rays',
    'MRIs',
    'CT scans',
    'ultrasounds',
    'healthcare research',
    'diagnostic algorithms',
    'machine learning',
    'medical conditions',
    'image analysis',
    'patient data',
    'healthcare technology',
    'annotated medical images',
    'medical datasets',
    'imaging modalities',
  ];

  const third_array = [
    'traffic flow',
    'urban traffic',
    'road sensors',
    'transportation planning',
    'intelligent transportation systems',
    'vehicle counts',
    'speed measurements',
    'hourly traffic data',
    'traffic management',
    'European cities',
  ];

  const forth_array = [
    'Blockchain Technology',
    'Decentralized Finance (DeFi)',
    'Cryptocurrency Markets',
    'Smart Contracts',
    'Cross-Border Payments',
    'Financial Innovation',
    'Supply Chain Finance',
    'Fintech',
    'Digital Assets',
    'Tokenization',
    'Distributed Ledger Technology (DLT)',
    'Blockchain Adoption',
    'Banking & Finance',
    'Investment Trends',
    'Market Analysis',
  ];

  return (
    <div>
      <DSHero handleComingSoonModalClick={handleComingSoonModalClick} />
      <div className="mb-20">
        {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}

        <DSCards
          code_name="3 Years Danish Heat Meter Data"
          description="This dataset includes three years of cleaned hourly data from 3021 commercial smart heat meters installed in Danish residential buildings. The data are screened, interpolated to be equidistant"
          arrays={first_array}
          image={heat}
        />
        <DSCards
          code_name="5 Years Medical Images from 1500 Patients"
          description="Five Years of Annotated Medical Images from 1500 Patients Across Various Imaging Modalities is a comprehensive dataset containing meticulously labeled images collected over a five-year period. The dataset includes diverse imaging modalities such as X-rays, MRIs, CT scans, and ultrasounds, sourced from 1500 patients. "
          arrays={second_array}
          image={medical}
        />
        <DSCards
          code_name="3 Years Urban Traffic Data"
          description="Three Years of Hourly Traffic Flow Data from 1500 Road Sensors in European Urban Areas is a detailed dataset that provides traffic flow information collected from 1500 road sensors installed across various urban areas in Europe. Spanning three years, the dataset includes hourly traffic counts, vehicle classifications, and speed measurements. Each data point is supplemented with contextual information such as location, weather conditions, and time of day. This dataset is ideal for research in traffic flow analysis, urban traffic management, transportation planning, and the development of intelligent transportation systems.; "
          arrays={third_array}
          image={traffic}
        />
        <DSCards
          code_name="BlockchainFinanceTrends Data"
          description="The BlockchainFinanceTrends dataset compiles comprehensive data on the application of blockchain technology in the financial sector worldwide. It includes transaction records from decentralized finance (DeFi) platforms, price volatility in cryptocurrency markets, case studies of blockchain technology adoption in banking and financial services, and the development trends of major global blockchain finance projects. This dataset also covers details on the use of blockchain technology in cross-border payments, smart contracts, and supply chain finance, providing researchers and financial analysts with deep insights into the impact of blockchain on the traditional financial system.;"
          arrays={forth_array}
          image={blockchaintrend}
        />
      </div>
    </div>
  );
};

export default Dataset;
