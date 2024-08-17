import AllocationTables, { AllocationTables2 } from './components/Tables';

const Allocation = () => {
  return (
    <div className='pt-36'>
      <div className='px-5 md:px-20'>
        <h2
          className='text-white font-extrabold text-3xl mb-16 md:text-5xl'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          Unlock allocation chart
        </h2>
        <AllocationTables />
        <AllocationTables2 />
      </div>
    </div>
  );
};

export default Allocation;
