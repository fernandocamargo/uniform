import property from 'lodash/property';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    background-color: #fff;
    opacity: 1;
  }

  body {
    font-family: ${property('theme.typography.main')};
  }

  figure {
    margin: 0;
  }
`;
