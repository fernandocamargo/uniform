import { Suspense as OnDemand } from 'react';
import { Route, Switch as Routes } from 'react-router-dom';

import { Loading } from 'components/widgets';

import { Dashboard, Login, NotFound } from './routes';

export default () => (
  <OnDemand fallback={<Loading />}>
    <Routes>
      <Route path="/login" component={Login} exact />
      <Route path="/dashboard" component={Dashboard} exact />
      <Route path="*" component={NotFound} />
    </Routes>
  </OnDemand>
);
