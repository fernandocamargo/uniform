import { Suspense as OnDemand } from 'react';

import { Route, Routes } from 'components';
import { Loading } from 'components/widgets';

import { Dashboard, Login, NotFound, Profile } from './routes';

export default () => (
  <OnDemand fallback={<Loading />}>
    <Routes>
      <Route path="/login" element={<Login />} exact />
      <Route path="/dashboard" element={<Dashboard />} exact />
      <Route path="/profile/*" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </OnDemand>
);
