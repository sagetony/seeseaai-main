import { Link } from 'react-router-dom';
import Icons from '../Icon/Icon';

const Footer = () => {
  return (
    <footer className='flex justify-center flex-col items-center gap-5 pb-10'>
      <div className='flex justify-center gap-10 items-center'>
        <div className='b bg-[#FFFFFF1A] rounded-full p-2 text-3xl'>
          <Link to='https://t.me/SeeSeaAI_OFFICIAL' target='_blank'>
            <Icons icon='logos:telegram' />
          </Link>
        </div>
        <div className='b bg-[#FFFFFF1A] rounded-full p-2 text-3xl'>
          <Link to='https://discord.gg/kukmTKe2q' target='_blank'>
            <Icons icon='logos:discord-icon' />
          </Link>
        </div>
        <div className='b bg-[#FFFFFF1A] rounded-full p-2 text-3xl'>
          <Link to='https://twitter.com/seeseaai' target='_blank'>
            <Icons
              icon='pajamas:twitter'
              className='bg-white p-2 rounded-full'
            />
          </Link>
        </div>
      </div>
      <p className='text-sm  text-white'>18+ and Copyright @ SeeSeaAI</p>
    </footer>
  );
};

export default Footer;
