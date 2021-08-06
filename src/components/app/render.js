import { Suspense as OnDemand } from 'react';
import { Route, Switch as Routes } from 'react-router-dom';

import { Loading } from 'components/widgets';

import { Basic, NotFound } from './routes';

export default () => (
  <OnDemand fallback={<Loading />}>
    <Routes>
      <Route path="/basic" component={Basic} exact />
      <Route path="*" component={NotFound} />
    </Routes>
  </OnDemand>
);
