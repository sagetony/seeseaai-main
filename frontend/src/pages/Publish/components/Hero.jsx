import { publish, publish_bg } from '../../../assets';

const Hero = () => {
  return (
    <div className='pt-[65px]'>
      <div
        className='md:h-[60vh] h-[100vh] bg-no-repeat bg-center bg-cover'
        style={{
          backgroundImage: `url(${publish_bg})`,
        }}
      >
        <div className='pl-5 md:pl-20 h-full'>
          <div className='flex justify-center gap-8 md:gap-0 overflow-hidden items-center h-full'>
            <div>
              <h2
                className='bg-phero text-5xl md:text-4xl lg:text-7xl md:text-right text-center font-bold bg-clip-text text-transparent'
                data-aos='zoom-in'
                data-aos-duration='1000'
              >
                Unlock the Power of AI
              </h2>
              <p
                className='text-white font-[300] text-center md:text-right italic text-lg'
                data-aos='zoom-in'
                data-aos-duration='1000'
              >
                Your Ultimate Data Destination!
              </p>
            </div>
            <img
              src={publish}
              className='-mr-48 hidden md:block    opacity-80'
              data-aos='zoom-in'
              data-aos-duration='1000'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
