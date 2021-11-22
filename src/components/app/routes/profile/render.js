import { Suspense as OnDemand } from 'react';
import { Helmet as Metatags } from 'react-helmet';

import { Route, Routes } from 'components';
import { Loading } from 'components/widgets';

import { AboutMe } from './routes';

export default () => (
  <>
    <Metatags>
      <title>Profile</title>
    </Metatags>
    <OnDemand fallback={<Loading />}>
      <Routes>
        <Route path="/about-me/*" element={<AboutMe />} />
      </Routes>
    </OnDemand>
  </>
);
