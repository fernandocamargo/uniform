import utils from '@date-io/moment';
import { ThemeProvider as Theming } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiPickersUtilsProvider as Time } from '@material-ui/pickers';

import theme from 'themes/default';
import { App, Style } from 'components';

export default () => (
  <Router>
    <Theming theme={theme}>
      <Style />
      <Time utils={utils}>
        <App />
      </Time>
    </Theming>
  </Router>
);
