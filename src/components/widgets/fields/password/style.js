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
  width: 100%;

  .MuiInputLabel-root[data-shrink='true'] {
    background-color: ${property('theme.palette.common.white')};
    margin-left: -5px;
    padding: 0 5px;
  }
`;
