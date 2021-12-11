/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useContext } from 'react';
import Layout from '../../layouts';
// import Slider from "react-slick";
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdClose } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from 'react-bootstrap';
import { LoginContext } from '../../contexts/LoginContextContainer';
// import ScrollImg from '../../assets/imgs/scroll.png';
import NavLogo from '../../assets/imgs/nav_logo.png';
import Currency from '../../components/currency';
import Pocket from '../../components/pocket';
import Services from '../../components/services';
import News from '../../components/news';
import About from '../../components/about';
import Card from '../../components/card';
import './styles.scss'

// interface SampleArrowProps {
//   className?: string
//   style?: Record<string, unknown>
//   onClick?: () => void
// }

// function SampleNextArrow(props: SampleArrowProps) {
//   const { className, style, onClick } = props
//   return (
//     <FaAngleRight
//       className={className}
//       style={{
//         ...style,
//         display: 'block',
//         right: 10,
//         zIndex: 1,
//         color: 'black',
//         opacity: 0.7,
//         width: 32,
//         height: 32,
//       }}
//       onClick={onClick}
//     />
//   )
// }
// function SamplePrevArrow(props: SampleArrowProps) {
//   const { className, style, onClick } = props
//   return (
//     <FaAngleLeft
//       className={className}
//       style={{
//         ...style,
//         display: 'block',
//         left: 10,
//         zIndex: 1,
//         color: 'black',
//         opacity: 0.7,
//         width: 32,
//         height: 32,
//       }}
//       onClick={onClick}
//     />
//   )
// }

const Home = () => {
  const [currentMenu, setCurrentMenu] = useState('');
  const [mobileMenuShow, setMobileMenuShow] = useState(false);
  const [isTop, setIsTop] = useState(window.scrollY < 150);
  const { currencies, tabs, sections, getSections } = useContext(LoginContext);
  const ref = useRef<any>(null);

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />
  // };

  const menus = [
    { title: "Home" },
    { title: "Personal", arrow: true },
    { title: "Business", arrow: true },
    { title: "Crypto" },
    { title: "Services", arrow: true },
    { title: "About Us" },
  ]

  // const renderHero = (data: any): JSX.Element => {
  //   return (
  //     <div className="hero-section" key={data.title}>
  //       <div className="container">
  //         <h1>{data.title}</h1>
  //         <p className='more'>{data.btnTitle}  -&gt;</p>
  //         <p className='scroll'>Scroll Down</p>
  //         <img src={ScrollImg} className="scroll-img" alt="BetterWin-img" />
  //       </div>
  //     </div>
  //   )
  // }

  const handleMenuClick = (item: string): void => {
    setCurrentMenu(item);
  }

  const toogleMobileMenu = (): void => {
    setMobileMenuShow(!mobileMenuShow);
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref?.current?.contains(event.target)) {
        setCurrentMenu('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    getSections();
  }, [])

  useEffect(() => {
    const checkTop = () => {
      const top = window.scrollY < 150 ? true : false;
      if (top !== isTop) {
        setIsTop(top);
      }
    }

    document.addEventListener('scroll', checkTop)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('scroll', checkTop)
    }
  }, [isTop])

  if (sections.length === 0) {
    return null;
  }
  // const HeroSection: any = sections.filter((section: any) => section.type === 'Hero')[0];
  const AboutSection: any = sections.filter((section: any) => section.type === 'About')[0];
  const PocketSection: any = sections.filter((section: any) => section.type === 'Pocket')[0];

  const ServiceSection: any = tabs.filter((tab: any) => tab.type === 'Service')[0];
  const NewsSection: any = tabs.filter((tab: any) => tab.type === 'News')[0];
  return (
    <Layout>
      <div className="main-container">
        <div className="video-background">
          <div className="video-foreground">
            <video autoPlay muted loop className="relative top-0 w-full bg-cover desktop_background" style={{ zIndex: -1 }}>
              <source src="https://falconic.blob.core.windows.net/imgs/background.mp4" type="video/mp4"></source>
            </video>
            <img className="mobile_background" src="https://falconic.blob.core.windows.net/imgs/background.gif" alt="loading..." />
            <div className="video_background_gradient" />
            {/* <Slider {...settings}>
              {HeroSection.slider.map((data: any) => (
                renderHero(data)
              ))}
            </Slider> */}
          </div>
        </div>
        <div className={`nav_container ${currentMenu !== '' ? 'select' : ''} ${isTop ? '' : 'full_nav'}`} ref={ref}>
          <div className="nav_top">
            <div className={`nav_menu ${isTop ? 'container' : ''}`}>
              <div className="container">
                <Button className="mobile_menu_hamburger" onClick={toogleMobileMenu}>
                  <GiHamburgerMenu fontSize={30} />
                </Button>
                <div className="title-section">
                  <img src={NavLogo} className="navLogo-img" alt="FalconicLogo-img" />
                </div>
                <div className="mobile_login">
                  <Button className="login_btn">
                    <FaUserAlt />
                    <p>Login</p>
                  </Button>
                  </div>
                <div className="menus">
                  {menus.map(menu => (
                    <div className={`menu ${currentMenu === menu.title ? 'active' : ''}`} key={menu.title} onClick={() => handleMenuClick(menu.title)}>
                      <p>{menu.title}</p>
                      {menu.arrow && <MdKeyboardArrowDown />}
                    </div>
                  ))}
                  <FaSearch className="search_icon" />
                  <Button className="login_btn">
                    <FaUserAlt />
                    Login
                  </Button>
                  <Button variant="light" className="en_btn">EN</Button>
                </div>
              </div>
            </div>
            <div className="dropdown container row">
              <MdClose className="close" onClick={() => setCurrentMenu('')} />
              <div className="col-md-1" />
              <div className="col-md-2">
                <p className="sub_title">Overview Accounts</p>
                <div className="lists">
                  <p className="list">Current Account</p>
                  <p className="list">Savings Account</p>
                  <p className="list">Watani Account</p>
                  <p className="list">Hassalati Account</p>
                  <p className="list">Digital Account</p>
                  <p className="list">Deposits</p>
                  <p className="list">Tayseer (Salary Advance)</p>
                  <p className="list">SIB Maxplus Account</p>
                </div>
              </div>
              <div className="col-md-2">
                <p className="sub_title">Finances</p>
                <div className="lists">
                  <p className="list">Overview</p>
                  <p className="list">Additional Personal Finance</p>
                  <p className="list">Takeover Liability</p>
                  <p className="list">Travel Finance</p>
                  <p className="list">Medical Finance</p>
                  <p className="list">Rent Finance</p>
                  <p className="list">Tayseer (Salary Advance)</p>
                  <p className="list">Takaful</p>
                </div>
              </div>
              <div className="col-md-2">
                <p className="sub_title">Cards</p>
                <div className="lists">
                  <p className="list">Credit Card</p>
                  <p className="list">Prepaid Card</p>
                  <p className="list">Debit Cards</p>
                  <p className="list">Installment Products</p>
                  <p className="list">Compare</p>
                </div>
              </div>
              <div className="col-md-2">
                <p className="sub_title">Tools</p>
                <div className="lists">
                  <p className="list">Calculators</p>
                  <p className="list">IBAN</p>
                  <p className="list">Currency Convertor</p>
                  <p className="list">Branches & ATMs</p>
                  <p className="list">Ways of Banking</p>
                  <p className="list">Terms & Charges</p>
                </div>
              </div>
              <div className="col-md-2">
                <p className="sub_title">Digital Banking</p>
                <div className="lists">
                  <p className="list">Digital Account</p>
                  <p className="list">Mobile Banking</p>
                  <p className="list">Online Banking</p>
                </div>
                <p className="sub_title">Forms & Library</p>
              </div>
              <div className="col-md-1" />
            </div>
            <div className="mobile_menu_container">
              {mobileMenuShow && (
                <div className="mobile_menu">
                  {menus.map(menu => (
                    <div className={`menu ${currentMenu === menu.title ? 'active' : ''}`} key={menu.title}>
                      <p>{menu.title}</p>
                      {menu.arrow && <MdKeyboardArrowDown />}
                    </div>
                  ))}
                </div>
              )}
              {mobileMenuShow && <div className="mobile_menu_right" onClick={toogleMobileMenu} />}
            </div>
          </div>
          <div className="nav_bottom" onClick={() => setCurrentMenu('')} />
        </div>
        <div className="container">
          <Currency data={currencies} />
          <Pocket data={PocketSection} />
          <Services data={ServiceSection} />
          <Card data={ServiceSection} />
        </div>
        <About data={AboutSection} />
        <div className="container">
          <News data={NewsSection} />
        </div>
      </div>
    </Layout>
  )
}

export default Home
