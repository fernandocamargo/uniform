import property from 'lodash/property';
import styled, { css } from 'styled-components';

export const debug = () => css`
  .MuiSvgIcon-root {
    fill: ${property('theme.palette.error.main')};
  }
`;

export const validate = ({ error }) => !!error && debug();

export default (component) => styled(component)`
  ${validate};
`;
