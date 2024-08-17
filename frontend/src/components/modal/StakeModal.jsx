/* eslint-disable react/prop-types */
import { useState } from 'react';
import { btnspan, close, gcal, wbnb } from '../../assets';
import './styles.css';
import Icons from '../Icon/Icon';

const StakeModal = ({ onclose }) => {
  const [value, setValue] = useState(0);
  const [selectedPurpose, setSelectedPurpose] = useState('30d');

  const handleSelect = (purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };
  return (
    <div
      className="fixed backdrop-filter backdrop-blur-md h-full w-full flex items-center justify-center z-[999px] top-0 left-0"
      onClick={handleModalOverlayClick}
    >
      <div className="bg-transparent md:max-h-[450px] max-h-[600px] overflow-auto text-white border border-slate-300 rounded-lg p-5 w-full md:w-1/2">
        <div className="flex justify-between items-start mb-4">
          <div className="md:flex hidden flex-col items-center">
            <img src={wbnb} />
            <p className="font-semibold mt-1">WBNB</p>
            <p className="font-[300]">Balance:0</p>
          </div>
          <div className="w-[75%] ">
            <h5 className="font-bold text-xl">Stake AMOUNT:</h5>
            <p className="py-2 font-[300]">WBNB</p>
            <input
              className="w-full bg-[#010E35] py-2 rounded-lg px-2 outline-none hover:ring-2"
              value={value}
              placeholder="0.0"
            />
          </div>
          <img src={close} onClick={onclose} className=" cursor-pointer w-8" />
        </div>
        <div className="md:pl-12 pr-12">
          <div className="md:ml-14 md:-mt-10 -mt-3">
            <p className="font-[300] text-slate-300 text-sm ">
              ~{120 - value}USD
            </p>
            <input
              type="range"
              value={value}
              min="0"
              max="120"
              onChange={handleChange}
              className="w-full mb-5 h-3 bg-[#187BCE] appearance-none rounded-full focus:outline-none lfocus:ring-2 lfocus:ring-[#187BCE] cursor-pointer slider-thumb"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <p
              className="bg-[#187BCE] text-center rounded-lg py-1 cursor-pointer"
              onClick={() => setValue((25 / 100) * 120)}
            >
              25%
            </p>
            <p
              className="bg-[#187BCE] text-center rounded-lg py-1 cursor-pointer"
              onClick={() => setValue((50 / 100) * 120)}
            >
              50%
            </p>
            <p
              className="bg-[#187BCE] text-center rounded-lg py-1 cursor-pointer"
              onClick={() => setValue((75 / 100) * 120)}
            >
              75%
            </p>
            <p
              className="bg-[#187BCE] text-center rounded-lg py-1 cursor-pointer"
              onClick={() => setValue((100 / 100) * 120)}
            >
              Max
            </p>
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-5">
            <div className=" w-[55%]">
              <h5 className="font-bold text-lg">Stake Periods:</h5>{' '}
              <div className="grid grid-cols-3 gap-3 my-2 ">
                <button
                  className={`rounded-md   p-1 px-3 text-sm text-gray6 ${
                    selectedPurpose === '30d'
                      ? 'bg-hbtn text-white '
                      : 'bg-transparent border border-slate-300 text-slate-300'
                  }`}
                  onClick={() => handleSelect('30d')}
                >
                  30D
                </button>
                <button
                  className={`rounded-md   p-1 px-3 text-sm text-gray6 ${
                    selectedPurpose === '60d'
                      ? 'bg-hbtn text-white '
                      : 'bg-transparent border border-slate-300 text-slate-300'
                  }`}
                  onClick={() => handleSelect('60d')}
                >
                  60D
                </button>
                <button
                  className={`rounded-md   p-1 px-3 text-sm text-gray6 ${
                    selectedPurpose === '90d'
                      ? 'bg-hbtn text-white '
                      : 'bg-transparent border border-slate-300 text-slate-300'
                  }`}
                  onClick={() => handleSelect('90d')}
                >
                  90D
                </button>
              </div>
              <h5 className="font-bold text-lg mt-9">POSITION OVERVIEW</h5>{' '}
            </div>
            <div className="md:w-[40%] mt-5">
              <p className="flex gap-2 text-[#B9B9B9] text-[12px] font-[300] ">
                <span>
                  <Icons icon="ph:info-light" className="text-lg mt-[1px]" />
                </span>
                <span>
                  Funds will not be available for withdrawal for the first 10
                  days, and subsequently an early withdrawal fee will be applied
                  if amount is unstaked before locked period is up.{' '}
                  <a className="h underline">Click here for more</a>
                </span>
              </p>
            </div>
          </div>
          <div className=" bg-[#010E35] relative   p-5 pr-14 text-slate-200  rounded-lg my-4 md:w-4/5">
            <p className="flex justify-between mb-5">
              STAKE AMOUNT <span>0</span>
            </p>
            <p className="flex justify-between mb-5">
              DURATION <span>30 days</span>
            </p>
            <p className="flex justify-between mb-5">
              APR <span>1%</span>
            </p>
            <p className="flex justify-between mb-5">
              LOCKED CAKE BOOST<span>1.1x</span>
            </p>
            <p className="flex justify-between mb-5">
              STAKE PERIOD ENDS <span>Jun 13, 2024 14:00</span>
            </p>
            <p className="flex justify-between ">
              PROJECTED RETURN{' '}
              <span className="flex flex-col">
                <span>0 WBNB</span>
                <span className="text-[12px] text-right text-gray-400">
                  ~0.0USD
                </span>
              </span>
            </p>{' '}
            <img src={gcal} className="w-8 h-8 absolute bottom-6 right-5" />
          </div>
          <div className="flex justify-between mt-10 items-center">
            <button
              className="bg-hbtn md:w-1/3 hover:ring-2 py-2 shadow-btns relative text-center px-14 pl-5 font-bold md:text-lg rounded-[20px] text-white "
              //   data-aos='zoom-in'
              //   data-aos-duration='1000'
            >
              Confirm
              <span className="absolute right-4 top-2">
                <img src={btnspan} className="md:w-6 md:h-6 w-8 h-8" />
              </span>
            </button>{' '}
            <button
              className=" bg-none md:w-1/3 hover:ring-2 py-2  border border-slate-400  text-center px-10   font-bold md:text-lg rounded-[20px] text-white "
              //   data-aos='zoom-in'
              //   data-aos-duration='1000'
            >
              Get WBNB
            </button>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeModal;
