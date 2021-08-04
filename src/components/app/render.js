import { Suspense as OnDemand } from 'react';
import { Route, Switch as Routes } from 'react-router-dom';

import { Loading } from 'components/widgets';

import { Basic, Macros, NotFound } from './routes';

export default () => (
  <OnDemand fallback={<Loading />}>
    <Routes>
      <Route path="/basic" component={Basic} exact />
      <Route path="/macros" component={Macros} exact />
      <Route path="*" component={NotFound} />
    </Routes>
  </OnDemand>
);
