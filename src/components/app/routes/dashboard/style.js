import property from 'lodash/property';
import styled from 'styled-components';

import { Date, Switch } from 'components/widgets/fields';

export default (component) => styled(component)`
  ${Switch} {
    width: 100%;

    &:before {
      content: '';
      display: block;
      height: 100%;
      left: 0;
      pointer-events: revert;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    .MuiFormControlLabel-root {
      flex-direction: row-reverse;
      justify-content: space-between;
      margin: 0;
      position: relative;

      .MuiSwitch-root,
      .MuiFormControlLabel-label {
        position: relative;
        z-index: 2;
      }

      .MuiFormControlLabel-label {
        font-weight: ${property('theme.typography.fontWeightBold')};
      }
    }

    .MuiFormHelperText-root {
      position: relative;
      z-index: 2;
    }
  }

  ${Date} {
    & + {
      .MuiIconButton-root {
        margin: ${({ theme: { spacing } }) =>
          `${spacing(1)} 0 0 ${spacing(1)}`};
      }
    }
  }
`;
