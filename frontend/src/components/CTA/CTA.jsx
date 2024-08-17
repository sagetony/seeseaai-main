import { Link } from 'react-router-dom';

const Cta = () => {
  return (
    <div
      className="mx-5 md:mx-20 md:p-10 my-20 mb-20 md:px-12 p-5 shadow-btns rounded-xl bg-[#FFFFFF1A]"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h4 className="text-3xl text-[#FFD25D] font-bold mb-5">
        More question？
      </h4>
      <h3 className="text-white font-extrabold mb-16 text-4xl md:text-5xl">
        We are{' '}
        <span className="bg-cta bg-clip-text text-transparent">
          happy to help
        </span>
      </h3>
      <div className="flex flex-col md:gap-20 gap-10 md:flex-row justify-between">
        {/* <Link className='md:w-1/2 w-full hover:bg-white hover:text-blue-950  text-center border p-3 px-20 font-semibold text-xl text-white border-slate-400 rounded-xl'>
          <p>User Guide</p>
        </Link> */}
        <Link
          className="md:w-1/2 w-full hover:bg-white hover:text-blue-950  text-center border p-3 px-20 font-semibold text-xl text-white border-slate-400 rounded-xl"
          to="/help-center"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <p>Help Center</p>
        </Link>
      </div>
    </div>
  );
};

export default Cta;
