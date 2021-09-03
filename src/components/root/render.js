import { ThemeProvider as Theming } from '@mui/material/styles';
import { LocalizationProvider as Localization } from '@mui/lab';
import dateAdapter from '@mui/lab/AdapterMoment';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from 'themes/default';
import { App, Style } from 'components';

export default () => (
  <Router>
    <Theming theme={theme}>
      <Style />
      <Localization dateAdapter={dateAdapter}>
        <App />
      </Localization>
    </Theming>
  </Router>
);
