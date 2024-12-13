import React from 'react';
import logoutIcon from '../../assets/logout.png';
import { logout } from '../../utils/token';
import { useNavigate } from 'react-router';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <button className="fixed top-[24px] right-[24px] z-50" onClick={handleLogout}>
      <img src={logoutIcon} alt="logout" className="w-[25px] h-[25px]" />
    </button>
  );
};

export default LogoutButton;
