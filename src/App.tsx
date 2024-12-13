import { Outlet } from 'react-router-dom';
import { LoadingProvider } from './lib/useLoading';

function App() {
  return (
    <LoadingProvider>
      <Outlet />
    </LoadingProvider>
  );
}

export default App;
