import React, { useEffect, useState } from 'react';
import backgroundImage0 from '../../../assets/main_background_image0.jpg';
import backgroundImage1 from '../../../assets/main_background_image1.jpg';
import backgroundImage2 from '../../../assets/main_background_image2.jpg';
import mainHomeIcon from '../../../assets/main_home_icon.svg';
import mainAboutUsIcon from '../../../assets/main_about_us_icon.svg';
import mainBookFlightIcon from '../../../assets/main_book_flight_icon.svg';
import mainContactUsIcon from '../../../assets/main_contact_us_icon.svg';
import { useNavigate } from 'react-router';
import { PATHS } from '../../../constants/paths';
import { postGoogleOAuth } from '../../../api/auth';

const BACKGROUND_IMAGES = [backgroundImage0, backgroundImage1, backgroundImage2];

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  const handleStartChat = () => {
    navigate(PATHS.CHAT);
  };

  const handleSignIn = async () => {
    try {
      const { data } = await postGoogleOAuth();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (backgroundImageIndex + 1) % BACKGROUND_IMAGES.length;

      setBackgroundImageIndex(nextIndex);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [backgroundImageIndex]);
  return (
    <div className="hero h-[100vh] w-[100vw] relative">
      <div className="root bg-white h-full">
        <div
          className="overlap-group bg-cover bg-center h-full w-full"
          style={{
            backgroundImage: `url(${BACKGROUND_IMAGES[backgroundImageIndex]})`,
          }}
        >
          <div className="groups flex flex-col items-center h-full w-full">
            <div className="head flex justify-between items-start gap-4 bg-gradient-to-b from-black to-transparent p-12 w-full">
              <div className="t-company-name text-white text-[30px] font-bold whitespace-nowrap">
                SkyWay Airline Services
              </div>
              <div className="flex gap-16 items-center">
                <div className="menus flex flex-1 justify-center items-end gap-3 w-full">
                  <div className="menu flex flex-col items-center w-[fit-content]">
                    <img className="image h-[28px] w-[40px]" alt="Image" src={mainHomeIcon} />
                    <div className="t text-white text-[20px]">Home</div>
                  </div>
                  <img className="line w-[1px]" alt="Line" src="https://c.animaapp.com/vxioQ0qt/img/line-9-1.svg" />
                  <div className="menu flex flex-col items-center w-[fit-content]">
                    <img className="img h-[25px] w-[28px]" alt="Image" src={mainAboutUsIcon} />
                    <div className="t text-white text-[20px]">About Us</div>
                  </div>
                  <img className="line w-[1px]" alt="Line" src="https://c.animaapp.com/vxioQ0qt/img/line-9-1.svg" />
                  <div className="div flex flex-col items-center w-[fit-content]">
                    <img className="image-2 h-[24px] w-[29px]" alt="Image" src={mainBookFlightIcon} />
                    <div className="t-menu text-white text-[20px]">Book Flight</div>
                  </div>
                  <img className="line w-[1px]" alt="Line" src="https://c.animaapp.com/vxioQ0qt/img/line-9-1.svg" />
                  <div className="div flex flex-col items-center w-[fit-content]">
                    <img className="image-3 h-[28px] w-[24px]" alt="Image" src={mainContactUsIcon} />
                    <div className="text-wrapper text-white text-[20px]">Contact Us</div>
                  </div>
                </div>
                <button className="buttons flex gap-4" onClick={handleSignIn}>
                  <div className="text-wrapper-2 text-white text-[20px] font-semibold">Sign In</div>
                </button>
              </div>
            </div>
            <div className="body flex flex-col justify-between items-center w-full p-20">
              <div className="w-[min-content]">
                <p className="t-title text-white text-[48px] max-xl:text-[32px] font-semibold text-center inline-block whitespace-nowrap overflow-hidden border-r-2 border-white animate-typingEffect">
                  Experience the Future of Travel with AI-Powered Reservations.
                </p>
              </div>

              <div className="space h-[calc(100vh-540px)]" />
              <button
                onClick={handleStartChat}
                className="button border-2 border-white flex items-center justify-center p-4"
              >
                <div className="t-get-started text-white text-[18px] font-semibold">Start Your Journey</div>
              </button>
              <div className="indicators flex gap-2 m-8">
                {BACKGROUND_IMAGES.map((_, index) => (
                  <div
                    key={index}
                    className={`indicator bg-gray-100 h-[10px] w-[10px] rounded-full ${index === backgroundImageIndex ? 'bg-gray-800' : ''}`}
                    onClick={() => setBackgroundImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
