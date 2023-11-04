import { Navigate, Outlet } from 'react-router-dom';

import { RoutesLayout } from '-src/components';
import { ROUTE_PATHS } from '-src/constants';
import { useAuth } from '-src/hooks';

const PrivateRoutes = () => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <RoutesLayout>
      <Outlet />
    </RoutesLayout>
  ) : (
    <Navigate to={ROUTE_PATHS.login} />
  );
};

export default PrivateRoutes;
