import property from 'lodash/property';
import styled, { css } from 'styled-components';

export const debug = () => css`
  .MuiSwitch-switchBase {
    & + {
      .MuiSwitch-track {
        background-color: ${property('theme.palette.error.light')};
      }
    }

    &.Mui-checked {
      .MuiSwitch-thumb {
        background-color: ${property('theme.palette.error.main')};
      }

      & + {
        .MuiSwitch-track {
          background-color: ${property('theme.palette.error.dark')};
        }
      }
    }
  }
`;

export const validate = ({ error }) => !!error && debug();

export default (component) => styled(component)`
  ${validate};
`;
