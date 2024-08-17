import { Link } from 'react-router-dom';
import Icons from '../../../components/Icon/Icon';
import { data_set } from '../../../data/dataset';

const Dataset = () => {
  return (
    <div className=' py-16 pt-20  px-5 md:px-20'>
      <div className='flex justify-between md:items-center gap-3 flex-col md:flex-row'>
        <h3 className=' md:text-5xl text-4xl font-bold bg-dataset bg-clip-text text-transparent'>
          Premium data set
        </h3>
        <div className='relative'>
          <input
            placeholder='Search or jump to'
            className='bg-[#FFFFFF1A] hover:ring-1 outline-none text-2xl p-2 md:p-4 px-5 md:px-7   rounded-[30px] '
          />

          <Icons
            icon='ion:search-outline'
            className='absolute right-5 top-4  text-slate-300 md:text-4xl text-xl'
          />
        </div>
      </div>
      <div className='p-6 mt-10 backdrop-filter  backdrop-blur-sm bg-[#FFFFFF1A]'>
        <div className=''>
          {data_set.map((dat, index) => (
            <div
              key={index}
              data-aos='zoom-in'
              data-aos-duration='1500'
              className='flex mb-3 p-4 bg-[#FFFFFF1A] justify-between items-center'
            >
              <p className=' md:text-3xl  text-sm text-[#FFD25D]'>{dat.name}</p>
              <div className='flex gap-4 md:gap-10 items-center'>
                <p className=' md:text-3xl  text-sm text-white'>{dat.star}</p>
                <p className='bg-[#4340D1] rounded-full md:p-1 md:px-6 px-4 md:text-lg text-sm text-white'>
                  {dat.value}
                </p>
                <img src={dat.icon} className='md:w-full w-6' />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-end mt-10'>
        <button
          className='bg-hbtn py-3 shadow-btns font-bold  hover:ring-2 text-center text-xl px-10  rounded-[15px] text-white relative'
          // data-aos='fade-up'
          // data-aos-duration='1000'
        >
          <Link to='/dataset'>Find more</Link>
        </button>{' '}
      </div>
    </div>
  );
};

export default Dataset;
