import { Link } from 'react-router-dom';
import { HHero, btnspan, staking, purchase } from '../../../assets';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import ComingSoon from '../../../components/modal/ComingSoon';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleComingSoonModalClick = () => {
    setModalOpen(!modalOpen);
  };

  const closeComingSoonModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="pt-16">
      <div className="flex justify-between w-full items-center px-5 md:px-20">
        <div className="lg:w-[50%] lg:p-0 py-16">
          {' '}
          <h2
            className="text-white text-5xl md:text-6xl font-extrabold  "
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Perfectly store your AI technology in the{' '}
            <span className="bg-block  bg-clip-text text-transparent">
              blockchain
            </span>{' '}
          </h2>
        </div>
        <div className="hidden z-0 lg:block">
          <img
            src={HHero}
            className=""
            data-aos="zoom-in"
            data-aos-duration="1000"
          />
        </div>
      </div>
      <div className="px-5 md:px-20 py-10 mb-10 md:mb-40 flex md:flex-row md:gap-0 gap-10 flex-col justify-between">
        <div className="md:w-[60%] lg:w-[50%]">
          <p
            className="md:text-4xl text-2xl text-slate-300 font-[300]"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Provide value to your AI datasets - participate in SeeSeaAI and
            exchange models for value
          </p>
        </div>
        <div className="flex flex-col items-end md:w-[50%] lg:w-[40%] gap-5  text-2xl">
          <button
            className="bg-hbtn hover:ring-2 py-3 shadow-btns text-center w-full md:w-[70%] rounded-[20px] text-white relative"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Link
              to="/publish"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Publish{' '}
              <span className="absolute right-4 top-2">
                <img src={btnspan} className="w-10 h-10" />
              </span>
            </Link>
          </button>{' '}
          <button
            onClick={handleComingSoonModalClick}
            className="bg-hbtn hover:ring-2 py-3 shadow-btns md:w-[70%] w-full rounded-[20px] text-white"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Participation Detail
          </button>
        </div>
        {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}
      </div>
      <div className="px-5 md:px-20 py-6 flex md:flex-row md:gap-0 gap-10 flex-col-reverse justify-between">
        {' '}
        <div className="flex flex-col md:w-[40%] gap-5  text-2xl">
          <button
            className="bg-hbtn2 hover:ring-2 shadow-btns py-3 text-center md:w-[70%] rounded-[20px] text-white relative"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Link
              to="/token-purchase"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Token purchase
            </Link>
          </button>{' '}
          <button
            className="bg-hbtn2 hover:ring-2 py-3  shadow-btns md:w-[70%] rounded-[20px] text-white"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Link
              to="/token-staking"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Token staking
            </Link>
          </button>
        </div>
        <div className="md:w-[45%]" data-aos="zoom-in" data-aos-duration="1000">
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, FreeMode]}
            freeMode={true}
            className="xl:h-[360px] lg:h-[290px]"
            pagination={{
              clickable: true,
            }}
          >
            <SwiperSlide>
              <img src={staking} className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={purchase} className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={staking} className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={purchase} className="w-full" />
            </SwiperSlide>
            ...
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
