import { useState } from 'react';
import { prospect } from '../../../assets';
import './style.css';
import { vision_data } from '../../../data/vision';

const Vision = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className='py-16 pt-36'>
      <div className='px-5 md:px-20'>
        <p
          className='md:text-3xl  text-2xl text-slate-300 font-[300] text-center lg:text-right '
          data-aos='fade-up'
          data-aos-duration='1500'
        >
          At SeeSeaAi, our vision is to decentralize and capitalize AI models.
          By leveraging <br className='xl:block hidden' />
          blockchain and Al technology, we are creating a transparent, clear and
          real <br className='xl:block hidden' />
          decentralized ecosystem
        </p>
      </div>
      <div className='px-5 grid md:grid-cols-2 h-[1650px] md:h-[800px] lg:h-[400px] lg:grid-cols-4 xl:gap-10 gap-5 md:gap-10 my-20'>
        {vision_data.map((item, index) => (
          <div
            key={index}
            className={`card-container ${
              flippedIndex === index ? 'flipped' : ''
            }`}
            onClick={() => handleFlip(index)}
          >
            <div className='card'>
              <div
                className='card-front bg-cards1 shadow-cards1 items-center flex flex-col rounded-[17px] h-[380px] p-8 px-5  '
                // data-aos='fade-up'
                // data-aos-duration={index % 2 === 0 ? '1000' : '1500'}
              >
                <img src={item.imgSrc} className='w-60 h-60' alt={item.text} />
                <p className='text-[#B9BBC3] font-bold text-3xl text-center'>
                  {item.text}
                </p>
              </div>
              <div className='card-back bg-cards1 shadow-cards1 rounded-[17px] p-8 px-5'>
                <p className='text-[#B9BBC3] font-bold text-xl  '>
                  {item.text}
                </p>
                <p className='text-slate-300 text-lg font-[300] mt-4  '>
                  {item.para}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='relative mt-96 md:mt-36 px-5 md:px-20'>
        <img
          src={prospect}
          className='w-[1000px]'
          data-aos='zoom-in'
          data-aos-duration='1500'
        />
        <p
          className='bg-cards1 absolute lg:w-[1050px] bottom-0 py-20 p-14 backdrop-filter backdrop-blur-sm lg:right-20   right-5 shadow-cards1 rounded-[17px] text-slate-300 text-xl ml-5'
          data-aos='fade-up'
          data-aos-duration='1500'
        >
          Launch a platform for AI asset trading and paid use of AI works that
          will play a huge role in the next-generation AI assetization process,
          including but not limited to AI solution content detection, AI
          algorithm identification, AI data testing, analysis of content sources
          and content creation motivations, Compile content to adapt to
          different application scenarios.
        </p>
      </div>
    </div>
  );
};

export default Vision;
