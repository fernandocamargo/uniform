import { ThemeProvider as Theming } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from 'themes/default';
import { App, Style } from 'components';

export default () => (
  <Router>
    <Theming theme={theme}>
      <Style />
      <App />
    </Theming>
  </Router>
);
