import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '-src/components';
import { ROUTE_PATHS } from '-src/constants';
import { useAuth } from '-src/hooks';

export const PrivateRoutes = () => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to={ROUTE_PATHS.login} />
  );
};

