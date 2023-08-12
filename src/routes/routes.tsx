import { lazy, Suspense } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import { Fallback } from '-components/index';
import { ROUTE_PATHS } from '-src/constants';
import { useAuth } from '-src/hooks';

import PrivateRoutes from './private-routes';
import PublicRoutes from './public-routes';

const Home = lazy(() =>
  import('-src/screens').then((module) => ({ default: module.Home }))
);

const Login = lazy(() =>
  import('-src/screens').then((module) => ({ default: module.Login }))
);

const Register = lazy(() =>
  import('-src/screens').then((module) => ({ default: module.Register }))
);

const NotFound = lazy(() =>
  import('-src/screens').then((module) => ({ default: module.NotFound }))
);

const Routes = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <Fallback />;

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        {/* PRIVATE */}
        <Route element={<PrivateRoutes />}>
          <Route path={ROUTE_PATHS.home} element={<Home />} />
        </Route>

        {/* PUBLIC */}
        <Route element={<PublicRoutes />}>
          <Route path={ROUTE_PATHS.login} element={<Login />} />
          <Route path={ROUTE_PATHS.register} element={<Register />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
