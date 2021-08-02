import { StrictMode } from 'react';
import { render } from 'react-dom';

import { Root } from 'components';
import { measure } from 'tools';

export const initialize = () =>
  render(
    <StrictMode>
      <Root />
    </StrictMode>,
    document.getElementById('root'),
    measure.bind(this, process.env.DEBUGGING && console.log)
  );

export default document.fonts.ready.then(initialize);
