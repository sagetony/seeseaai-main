import { Link } from 'react-router-dom';
import { audit, btnspan, comp } from '../../../assets';

const Content = () => {
  return (
    <div className='py-16 pt-36 text-white'>
      <div className='px-5 md:px-20 text-xl'>
        <h2
          className='font-bold text-3xl md:text-5xl mb-9'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Publish
        </h2>
        <p data-aos='fade-up' data-aos-duration='1000'>
          <b>The purpose and background of the dataset</b>
        </p>
        <p
          className='font-[300] mb-7 text-slate-300'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Publishers need to explain why this dataset was created to solve a
          problem or support a task
        </p>
        <p data-aos='fade-up' data-aos-duration='1000'>
          <b>Contents of the dataset</b>
        </p>
        <p
          className='font-[300] mb-7 text-slate-300'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Describe the data types, features, and labels (if any) contained in
          the dataset
        </p>
        <p data-aos='fade-up' data-aos-duration='1000'>
          <b>Data set size</b>
        </p>
        <p
          className='font-[300] mb-7 text-slate-300'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Contains the number of samples and the number of features
        </p>
        <p data-aos='fade-up' data-aos-duration='1000'>
          <b>Source of data set</b>
        </p>
        <p
          className='font-[300] mb-7 text-slate-300'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Explain the source of data and the means of obtaining it, such as
          through experiments, surveys, sensors, etc.
        </p>
        <p data-aos='fade-up' data-aos-duration='1000'>
          <b>Dataset format</b>
        </p>
        <p
          className='font-[300] mb-7 text-slate-300'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Describe the data storage format, such as CSV, JSON, database, etc.
        </p>
        <div className='mt-20 flex flex-col md:flex-row justify-between items-start'>
          <h2
            className='font-bold text-3xl md:text-5xl mb-4 md:mb-9'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            Complete process plan
          </h2>{' '}
          <button
            className='bg-pbtn hover:ring-2 py-3 shadow-btns text-center w-full md:w-[250px] mb-9 md:mb-0  rounded-[20px] text-white relative'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            Auditing body{' '}
            <span className='absolute right-4 top-2'>
              <img src={audit} className='w-10 h-10' />
            </span>
          </button>{' '}
        </div>
        <div
          className='flex items-center justify-center  '
          data-aos='zoom-in'
          data-aos-duration='1000'
        >
          <img src={comp} className='md:w-[1200px] object-cover' />
        </div>
        <div className='flex justify-center my-10 items-center'>
          <button
            className='bg-hbtn hover:ring-2 py-3 shadow-btns text-center mt-4 w-[250px]  rounded-[20px] text-white relative'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            <Link
              to='/publish'
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Publish{' '}
              <span className='absolute right-4 top-2'>
                <img src={btnspan} className='w-10 h-10' />
              </span>
            </Link>
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default Content;
