import { Suspense as OnDemand } from 'react';
import { Helmet as Metatags } from 'react-helmet';

import { Route, Routes } from 'components';
import { Loading } from 'components/widgets';

import { Edit } from './routes';

export default () => (
  <>
    <Metatags>
      <title>Profile &raquo; About me</title>
    </Metatags>
    <OnDemand fallback={<Loading />}>
      <Routes>
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </OnDemand>
  </>
);
