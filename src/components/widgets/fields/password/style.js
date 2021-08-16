import property from 'lodash/property';
import styled, { css } from 'styled-components';

export const fail = () => css`
  fill: ${property('theme.palette.error.main')};
`;

export default (component) => styled(component)`
  width: 100%;

  .MuiSvgIcon-root {
    ${({ error }) => !!error && fail()};
  }
`;
