import { Navigate, Outlet } from 'react-router-dom';

import { RoutesLayout } from '-src/components';
import { ROUTE_PATHS } from '-src/constants';
import { useAuth } from '-src/hooks';

export const PublicRoutes = () => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Navigate to={ROUTE_PATHS.home} />
  ) : (
    <RoutesLayout>
      <Outlet />
    </RoutesLayout>
  );
};

