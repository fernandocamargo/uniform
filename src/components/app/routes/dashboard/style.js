import property from 'lodash/property';
import styled from 'styled-components';

import { Switch } from 'components/widgets/fields';

export default (component) => styled(component)`
  ${Switch} {
    width: 100%;

    .MuiFormControlLabel-root {
      flex-direction: row-reverse;
      justify-content: space-between;
      margin: 0;

      .MuiFormControlLabel-label {
        font-weight: ${property('theme.typography.fontWeightBold')};
      }
    }
  }
`;
