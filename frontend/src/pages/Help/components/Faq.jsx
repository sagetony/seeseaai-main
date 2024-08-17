import { useState } from 'react';
import Icons from '../../../components/Icon/Icon';

/* eslint-disable react/prop-types */
const Accordion = ({
  title,
  children,
  accordionIndex,
  openAccordionIndex,
  setOpenAccordionIndex,
}) => {
  const handleToggle = () => {
    setOpenAccordionIndex(
      openAccordionIndex === accordionIndex ? -1 : accordionIndex
    );
  };

  return (
    <div className=''>
      <div
        className='flex  cursor-pointer items-center gap-6 p-4'
        style={
          {
            //   backgroundColor: openAccordionIndex === accordionIndex ? 'grey' : '',
          }
        }
        onClick={handleToggle}
      >
        {openAccordionIndex === accordionIndex ? (
          <Icons icon='lucide:chevron-up' className='text-3xl' color='#fff' />
        ) : (
          <Icons icon='lucide:chevron-down' className='text-3xl' color='#fff' />
        )}
        <p className='font-semibold text-xl'>{title}</p>
      </div>
      {openAccordionIndex === accordionIndex && (
        <div className=' text-slate-300 p-4 pl-14'>{children}</div>
      )}
    </div>
  );
};
const Faq = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(-1);
  return (
    <section className=' px-5 md:px-20 text-white'>
      <div className='md:px-12 p-5 shadow-btns rounded-xl bg-[#FFFFFF1A] mb-20'>
        <h4 className='font-bold text-2xl mb-5'>Common Problem</h4>
        <Accordion
          title='1. Website Purpose: '
          accordionIndex={0}
          openAccordionIndex={openAccordionIndex}
          setOpenAccordionIndex={setOpenAccordionIndex}
        >
          <p className=''>
            The website is a comprehensive platform for user participation in AI
            digital assets, offering opportunities for trading and exchanging
            intellectual property of various AI works and models.
          </p>
        </Accordion>
        <Accordion
          title='2. What is SSAI token? '
          accordionIndex={1}
          openAccordionIndex={openAccordionIndex}
          setOpenAccordionIndex={setOpenAccordionIndex}
        >
          <div className=''>
            <p>
              SSAI tokens can be obtained in multiple ways, including purchasing
              on supported exchanges, participating in token sales, engaging in
              various platform activities, earning community rewards, or through
              staking and trading AI digital assets.
            </p>
          </div>
        </Accordion>
        <Accordion
          title='3.	How to buy SSAI tokens? '
          accordionIndex={2}
          openAccordionIndex={openAccordionIndex}
          setOpenAccordionIndex={setOpenAccordionIndex}
        >
          <div className=''>
            <ol className='l list-decimal'>
              <li>
                <b>Create a wallet and connect:</b> Download metamask or your
                wallet of choice from the app store or google play store for
                free. Desktop users, download the google chrome extension by
                going to metamask.io.
              </li>
              <li>
                <b>Get some USDT or BNB:</b> Have USDT or BNB in your wallet to
                switch to $SSAI. If you don’t have any BNB or USDT, you can buy
                directly on metamask, transfer from another wallet, or buy on
                another exchange and send it to your wallet.
              </li>
              <li>
                <b>Go to SeeSeaAI Website:</b> Connect the wallet in website in
                google chrome or on the browser inside your Metamask app.
                Connect your wallet. Scroll down the website and click the “buy
                crypto” button to select the quantity to purchase.
              </li>
              <li>
                <b> Switch BNB for $SSAI:</b> Switch BNB for $SSAI. We have ZERO
                taxes so you don’t need to worry about buying with a specific
                slippage, although you may need to use slippage during times of
                market volatility.
              </li>
            </ol>
            <div className='flex justify-end'>
              {' '}
              <button
                className='bg-hbtn hover:ring-2 shadow-btns py-3 text-center w-[250px] mt-7 rounded-[20px] text-white relative'
                data-aos='zoom-in'
                data-aos-duration='1000'
              >
                Buy now{' '}
              </button>{' '}
            </div>
          </div>
        </Accordion>
        <Accordion
          title='4.	How to stake SSAI tokens? '
          accordionIndex={3}
          openAccordionIndex={openAccordionIndex}
          setOpenAccordionIndex={setOpenAccordionIndex}
        >
          <div className=''>
            <ol className='l list-decimal'>
              <li>
                <b>Create a wallet and connect:</b> Go to SSAI official page in
                google chrome and connect the wallet to website. Before you
                stake $SSAI, you must have $SSAI in your wallet.
              </li>
              <li>
                <b>Stake the tokens:</b> Find the “Token Staking” button on the
                website and click the button, choose a token staking period. The
                last step is click finished. The longer the period, the greater
                the reward.
              </li>
              <li>
                <b>Get Reward:</b> Find the “Token Staking” button on the
                website and click the button, scroll to the bottom of the page,
                and click the “check reward” button to claim your reward when
                the staking period ends.
              </li>
              <li>
                <b> Switch BNB for $SSAI:</b> Switch BNB for $SSAI. We have ZERO
                taxes so you don’t need to worry about buying with a specific
                slippage, although you may need to use slippage during times of
                market volatility.
              </li>
            </ol>
            <div className='flex justify-end'>
              {' '}
              <button
                className='bg-hbtn hover:ring-2 shadow-btns py-3 text-center w-[250px] mt-7 rounded-[20px] text-white relative'
                data-aos='zoom-in'
                data-aos-duration='1000'
              >
                Stake now{' '}
              </button>{' '}
            </div>
          </div>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
