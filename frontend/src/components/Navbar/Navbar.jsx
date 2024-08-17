/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation } from 'react-router-dom';
import { Logo, whitepaper, User } from '../../assets';
import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import ComingSoon from '../modal/ComingSoon';

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [dropdown, setDropdown] = useState(null);
  const [dropdown2, setDropdown2] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [selected, setSelected] = useState('');

  const handleComingSoonModalClick = () => {
    setMobileMenuOpen(false);
    setModalOpen(!modalOpen);
  };

  const closeComingSoonModal = () => {
    setModalOpen(false);
  };

  const handleMouseEnter = (index) => {
    if (!isMobile && index !== 2) {
      setDropdown(index);
    }
  };

  const handleMouseEnter2 = () => {
    if (!isMobile) {
      setDropdown2(true);
    }
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  const handleMouseLeave2 = () => {
    setDropdown2(null);
  };

  const handleDownload = () => {
    // const link = document.createElement('a');
    // link.href = whitepaper;
    // link.download = 'SeeSeaAI-WhitePaper.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    window.open(whitepaper, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    };
  }, []);

  const renderDropdownContent = (item) => {
    if (isMobile) return null;
    switch (item) {
      case 'Publish':
        return (
          <ul className="list-none flex flex-col">
            {' '}
            <Link
              to="/publish"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="hover:bg-white hover:text-blue-950"
            >
              <li className="  border-b border-slate-500 pb-2 pt-1">Publish</li>
            </Link>
            <li
              className="hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1"
              onClick={handleComingSoonModalClick}
            >
              How to Release
            </li>
            <li
              className="hover:bg-white hover:text-blue-950 cursor-pointer  pb-2 pt-1"
              onClick={handleComingSoonModalClick}
            >
              Auditing Body
            </li>
          </ul>
        );
      case 'Token':
        return (
          <ul className="list-none flex flex-col ">
            <Link
              to="/token-purchase"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="hover:bg-white hover:text-blue-950"
            >
              <li className="border-b border-slate-500 pb-2 pt-1">
                Token purchase
              </li>
            </Link>
            <Link
              to="/token-staking"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="hover:bg-white hover:text-blue-950"
            >
              <li className="border-b border-slate-500 pt-1 pb-2">
                Token staking
              </li>
            </Link>{' '}
            <Link
              to="/unlock-allocation"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="hover:bg-white hover:text-blue-950"
            >
              <li className="border-b border-slate-500 pt-1 pb-2">
                Unlock allocation chart
              </li>
            </Link>
            <li
              className="hover:bg-white hover:text-blue-950 cursor-pointer  pb-2 pt-1"
              onClick={handleComingSoonModalClick}
            >
              Functions
            </li>
          </ul>
        );
      case 'Help':
        return (
          <ul className="list-none flex flex-col">
            <Link
              to="/help-center"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="hover:bg-white hover:text-blue-950"
            >
              <li className="border-b border-slate-500 pt-1 pb-2">
                Help center
              </li>
            </Link>
            <li
              className="hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1"
              onClick={handleComingSoonModalClick}
            >
              User guide
            </li>
            <li
              className="hover:bg-white hover:text-blue-950 cursor-pointer  pb-2 pt-1"
              onClick={handleDownload}
            >
              White paper
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveItem('home');
    } else if (location.pathname === '/publish') {
      setActiveItem('publish');
    } else if (location.pathname === '/token-purchase') {
      setActiveItem('token-purchase');
    } else if (location.pathname === '/dataset') {
      setActiveItem('dataset');
    } else if (location.pathname === '/token-staking') {
      setActiveItem('token-staking');
    } else if (location.pathname === '/unlock-allocation') {
      setActiveItem('unlock-allocation');
    } else if (location.pathname === '/help-center') {
      setActiveItem('help-center');
    }
    window.scrollTo(0, 0);
  }, [location]);

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    history.push(path);
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const activeColor = '#0079D0';

  const activeLinkStyle = {
    color: activeColor,
    textDecoration: 'none',
    borderBottom: '3px solid  #0079D0 ',
    paddingBottom: '5px',
    marginBottom: '-2px',
  };

  const handleDocumentClick = (e) => {
    if (isMobileMenuOpen && !e.target.closest(`.${styles.menuItems}`)) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMobileMenuOpen]);

  const logoSrc = scrolling ? Logo : Logo;

  return (
    <div>
      <nav
        className={`fixed lg:hidden top-0 w-full z-50 text-customGreen  font-medium   bg-[#002B5E] ${styles.navbar} `}
      >
        <div
          className={` xl:flex xl:items-center xl:justify-between xl:pl-20  xl:pr-24 xl:py-4  ${styles.navbarContainer}`}
        >
          <Link to="/">
            <img
              src={logoSrc}
              className=" "
              onClick={() => handleLinkClick('/')}
            />
          </Link>
          <div className={`  ${styles.useruser}`}>
            <div className={` relative`}>
              <img
                src={User}
                alt="User"
                className=""
                onMouseEnter={() => handleMouseEnter2()}
                onMouseLeave={handleMouseLeave2}
              />{' '}
              {dropdown2 && (
                <div
                  className="absolute font-normal text-lg top-15  w-[200px] rounded-b-lg right-0 bg-[#002B5E] text-slate-300 text-center py-4 pb-0 shadow-2xl"
                  onMouseEnter={() => handleMouseEnter2()}
                  onMouseLeave={handleMouseLeave2}
                >
                  <ul className="list-none flex flex-col">
                    <li
                      className="hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1"
                      onClick={handleComingSoonModalClick}
                      // className='border-b border-slate-500 pb-2 pt-1'
                    >
                      No KYC login
                    </li>
                    {/* </Link> */}
                    <li
                      className="hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1"
                      onClick={handleComingSoonModalClick}
                      // className='border-b border-slate-500 pb-2 pt-1'
                    >
                      Security and Privacy
                    </li>{' '}
                    <Link
                      to="/my-releases"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      className="hover:bg-white hover:text-blue-950"
                    >
                      <li className="  pt-2 pb-2 ">My releases</li>
                    </Link>{' '}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}
          <input type="checkbox" onChange={toggleMobileMenu} />
          <div className={styles.hamburgerLines}>
            <span className={`bg-white ${styles.line} ${styles.line1} `}></span>
            <span className={`bg-white ${styles.line} ${styles.line2} `}></span>
            <span className={`bg-white ${styles.line} ${styles.line3} `}></span>
          </div>
          <ul
            className={`hidden xl:flex bg-[#000b30]  text-base font-thin ${styles.menuItems} `}
          >
            <li>
              <p onClick={() => setSelected('publish')}>Publish</p>
            </li>
            {selected === 'publish' && (
              <span className={`${styles.menuItems2}`}>
                {' '}
                <li>
                  <Link
                    to="/publish"
                    style={activeItem === 'publish' ? activeLinkStyle : {}}
                    onClick={() => handleLinkClick('/publish')}
                  >
                    Publish
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      handleComingSoonModalClick();
                    }}
                  >
                    How to Release
                  </Link>
                </li>
                <li>
                  <Link onClick={handleComingSoonModalClick}>
                    Auditing Body
                  </Link>
                </li>
              </span>
            )}
            <li>
              <p onClick={() => setSelected('token')}>Token</p>
            </li>{' '}
            {selected === 'token' && (
              <span className={`${styles.menuItems2}`}>
                {' '}
                <li>
                  <Link
                    to="/token-purchase"
                    style={
                      activeItem === 'token-purchase' ? activeLinkStyle : {}
                    }
                    onClick={() => handleLinkClick('/token-purchase')}
                  >
                    Token purchase
                  </Link>
                </li>
                <li>
                  <Link
                    to="/token-staking"
                    style={
                      activeItem === 'token-staking' ? activeLinkStyle : {}
                    }
                    onClick={() => handleLinkClick('/token-staking')}
                  >
                    Token staking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/unlock-allocation"
                    style={
                      activeItem === 'unlock-allocation' ? activeLinkStyle : {}
                    }
                    onClick={() => handleLinkClick('/unlock-allocation')}
                  >
                    Unlock allocation chart
                  </Link>
                </li>
                <li>
                  <Link
                    // style={activeItem === 'home' ? activeLinkStyle : {}}
                    onClick={handleComingSoonModalClick}
                  >
                    Functions
                  </Link>
                </li>
              </span>
            )}
            <li>
              <Link
                to="/dataset"
                style={activeItem === 'dataset' ? activeLinkStyle : {}}
                onClick={() => handleLinkClick('/dataset')}
              >
                Dataset
              </Link>
            </li>
            <li>
              <p onClick={() => setSelected('help')}>Help</p>
            </li>
            {selected === 'help' && (
              <span className={`${styles.menuItems2}`}>
                {' '}
                <li>
                  <Link
                    to="/help-center"
                    style={activeItem === 'help-center' ? activeLinkStyle : {}}
                    onClick={() => handleLinkClick('/help-center')}
                  >
                    Help center
                  </Link>
                </li>
                <li>
                  <Link onClick={handleComingSoonModalClick}>User guide</Link>
                </li>
                <li>
                  <Link onClick={handleDownload}>White paper</Link>
                </li>
              </span>
            )}
          </ul>
        </div>
      </nav>{' '}
      <div
        className={`bg-[#002B5E] top-0 z-50 shadow-btns fixed  w-full pr-5 md:pr-16 ${styles.navbar} lg:block hidden`}
      >
        <div className={`flex justify-between items-center`}>
          <Link to="/">
            <div className="flex items-center gap-4">
              <img src={Logo} alt="Logo" />
              <h3 className="text-white text-2xl">SeeSeaAI</h3>
            </div>
          </Link>{' '}
          <ul
            className={`text-white font-[500] text-xl list-none hidden md:flex justify-around w-[40%] `}
          >
            {['Publish', 'Token', 'Dataset', 'Help'].map((item, index) => (
              <li key={index} className="relative">
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item === 'Dataset' ? (
                    <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                  ) : (
                    <span className="cursor-pointer">{item}</span>
                  )}
                  {dropdown === index && item !== 'Dataset' && (
                    <div
                      className="absolute font-normal text-lg top-5 mt-2 w-[250px] rounded-b-lg -left-24 bg-[#002B5E] text-slate-300 text-center pt-4 shadow-2xl"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {renderDropdownContent(item)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {modalOpen && <ComingSoon onclose={closeComingSoonModal} />}
          <div className="relatvive">
            <img
              src={User}
              alt="User"
              className=""
              onMouseEnter={() => handleMouseEnter2()}
              onMouseLeave={handleMouseLeave2}
            />{' '}
            {dropdown2 && (
              <div
                className="absolute font-normal text-lg top-15  w-[200px] rounded-b-lg right-0 bg-[#002B5E] text-slate-300 text-center py-4 pb-0 shadow-2xl"
                onMouseEnter={() => handleMouseEnter2()}
                onMouseLeave={handleMouseLeave2}
              >
                <ul className="list-none flex flex-col">
                  <li
                    className="hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1"
                    onClick={handleComingSoonModalClick}
                    // className='border-b border-slate-500 pb-2 pt-1'
                  >
                    No KYC login
                  </li>
                  {/* </Link> */}
                  <li
                    className="hover:bg-white hover:text-blue-950 cursor-pointer   border-b border-slate-500 pb-2 pt-1"
                    onClick={handleComingSoonModalClick}
                    // className='border-b border-slate-500 pb-2 pt-1'
                  >
                    Security and Privacy
                  </li>{' '}
                  <Link
                    to="/my-releases"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    className="hover:bg-white hover:text-blue-950"
                  >
                    <li className="  pt-2 pb-2 ">My releases</li>
                  </Link>{' '}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
