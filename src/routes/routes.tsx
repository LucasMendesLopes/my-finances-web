import { lazy, Suspense } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import { Fallback } from '-components/index';
import { ROUTE_PATHS } from '-src/constants';
import { useAuth } from '-src/hooks';

import { PrivateRoutes } from './private-routes';
import { PublicRoutes } from './public-routes';

const Finances = lazy(() =>
  import('-src/pages').then((module) => ({ default: module.Finances }))
);

const Categories = lazy(() =>
  import('-src/pages').then((module) => ({ default: module.Categories }))
);

const Login = lazy(() =>
  import('-src/pages').then((module) => ({ default: module.Login }))
);

const Register = lazy(() =>
  import('-src/pages').then((module) => ({ default: module.Register }))
);

const NotFound = lazy(() =>
  import('-src/pages').then((module) => ({ default: module.NotFound }))
);

export const Routes = () => {
  const { isLoadingSign } = useAuth();

  if (isLoadingSign) return <Fallback />;

  return (
    <Suspense fallback={<Fallback />}>
      <Switch>
        {/* PRIVATE */}
        <Route element={<PrivateRoutes />}>
          <Route path={ROUTE_PATHS.finances} element={<Finances />} />
          <Route path={ROUTE_PATHS.categories} element={<Categories />} />
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