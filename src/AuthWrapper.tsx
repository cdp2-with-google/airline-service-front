import { Navigate, Outlet } from 'react-router-dom';
import { isSignin } from './utils/token';

const AuthWrapper: React.FC = () => {
  if (!isSignin()) {
    window.alert('로그인 후 이용해주세요.');
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthWrapper;
