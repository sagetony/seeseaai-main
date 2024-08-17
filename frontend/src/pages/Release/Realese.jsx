import { Link } from 'react-router-dom';
import { btnspan } from '../../assets';
import ReleaseTable from './components/ReleaseTable';

const Realese = () => {
  return (
    <div className='pt-36'>
      <div className='px-5 md:px-20 text-white'>
        <h2
          className='text-white font-extrabold text-3xl mb-4 md:text-5xl'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          My release
        </h2>{' '}
        <div className='flex justify-start my-10 items-center'>
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
        <ReleaseTable />
        <h5 className='text-xl font-semibold mt-10 mb-5'>
          Published AI dateset Name
        </h5>
        <ReleaseTable />
        <p className='text-slate-300 font-[200] md:text-xl text-right mb-10'>
          Published Al dataset is used purchase history (sort order: purchase
          time)
        </p>
        <ReleaseTable />
        <p className='text-slate-300 font-[200] md:text-xl text-right mb-16'>
          Published intellectual property transfer records of works
        </p>
      </div>
    </div>
  );
};

export default Realese;
