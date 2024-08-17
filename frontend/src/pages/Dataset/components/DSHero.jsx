/* eslint-disable react/prop-types */
import Icons from '../../../components/Icon/Icon';

const DSHero = ({ handleComingSoonModalClick }) => {
  return (
    <div className='pt-36'>
      <div className='px-5 md:px-20'>
        <h2
          className='text-white font-extrabold text-3xl mb-2 md:text-5xl'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Premium data set
        </h2>
        <p
          className='text-slate-300 font-[300] text-xl '
          data-aos='fade-up'
          data-aos-duration='1500'
        >
          We currently maintain 1000+ datasets as a service to the machine
          learning community.
        </p>
        <div
          className='flex md:gap-10 gap-3 flex-col md:flex-row my-10 mt-6'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <button
            className='bg-hbtn hover:ring-2 py-2 shadow-btns  text-center px-14 pl-5 font-bold text-white md:text-lg rounded-[20px] '
            onClick={handleComingSoonModalClick}
          >
            Popular Datasets
          </button>
          <button
            className='bg-hbtn3 hover:ring-2 py-2 shadow-btns  text-center px-14 pl-5 font-bold md:text-lg rounded-[20px] '
            onClick={handleComingSoonModalClick}
          >
            Contribute A Dataset
          </button>
        </div>
        <div
          className='flex flex-col md:flex-row gap-3 md:gap-10 mb-10'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <div className='bg-[#FFFFFF1A] hover:ring-1 outline-none text-xl p-2 md:p-2 px-5 md:px-7 rounded-[30px] text-slate-300 flex items-center md:gap-5 md:justify-start justify-between md:w-1/3'>
            Language:{' '}
            <span className='flex items-center'>
              All{' '}
              <Icons icon='fe:drop-down' className='text-white text-3xl mt-1' />
            </span>
          </div>
          <div className='relatigve md:w-2/3'>
            <input
              placeholder='Search or jump to'
              className='bg-[#FFFFFF1A] hover:ring-1 outline-none text-xl p-2 md:p-3 px-5 md:px-7   rounded-[30px] w-full'
            />

            <Icons
              icon='ion:search-outline'
              className='absolute right-5 top-3  text-slate-300 md:text-3xl text-xl'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSHero;
