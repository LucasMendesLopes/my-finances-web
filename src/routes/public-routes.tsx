import { Navigate, Outlet } from 'react-router-dom';

import { RoutesLayout } from '-src/components';
import { ROUTE_PATHS } from '-src/constants';
import { useAuth } from '-src/hooks';

const PublicRoutes = () => {
  const { isSigned } = useAuth();

  return isSigned ? (
    <Navigate to={ROUTE_PATHS.home} />
  ) : (
    <RoutesLayout>
      <Outlet />
    </RoutesLayout>
  );
};

export default PublicRoutes;
