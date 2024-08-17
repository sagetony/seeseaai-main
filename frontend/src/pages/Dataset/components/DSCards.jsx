/* eslint-disable react/prop-types */
import Icons from '../../../components/Icon/Icon';

const DSCards = ({ code_name, description, arrays, image }) => {
  return (
    <div className="px-5 md:px-20 mb-6 ">
      <div
        className="bg-[#FFFFFF1A] flex items-start flex-col md:flex-row gap-5 p-5"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        {/* <img src={dscard} className='rounded-xl  ' /> */}
        <img src={image} className="rounded-xl w-16 h-16" />
        <div className="w-full text-slate-300">
          <div className="flex flex-col lg:flex-row justify-between w-full lg:items-center mb-3">
            <p className="text-slate-300 flex items-center gap-2 font-[300]">
              <span className="text-[#FFD25D] text-lg font-normal">
                {code_name}
              </span>
              <span className="flex items-center text-sm gap-2">
                <div className="w-4 h-4 inline-block bg-[#266DA1] rounded-full"></div>
                Python{' '}
              </span>
            </p>
            <div className="flex gap-4 flex-col  md:flex-row md:items-center md:mt-0 mt-3">
              <div className="rounded-2xl gap-3 text-[14px]  flex items-center justify-center border border-white text-center text-white py-1 px-5">
                <Icons icon="mdi:user-multiple" className=" text-xl" />
                Sponsor
              </div>

              <div className="bg-[#4340D1] text-[14px] rounded-2xl flex items-center justify-center gap-3 px-3 py-[3px] text-slate-300">
                <Icons
                  icon="material-symbols-light:star-outline"
                  className="text-2xl"
                />
                292.5k <span>Star</span>{' '}
                <Icons icon="fe:drop-down" className="text-white text-2xl " />
              </div>
            </div>
          </div>
          <p className="font-[300] mb-4">{description}</p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 bg-[#010E35] p-3 rounded-lg">
            {arrays.map((keyword, index) => (
              <p
                key={index}
                className="bg-[#0176CC] text-white text-center rounded-full p-2 flex items-center justify-center"
              >
                <span>{keyword}</span>
              </p>
            ))}
          </div>
          {/* <p className='font-[300] mt-5'>Updated 17 hours ago</p> */}
        </div>
      </div>
    </div>
  );
};

export default DSCards;
