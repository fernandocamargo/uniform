import property from 'lodash/property';
import styled, { css } from 'styled-components';

export const debug = () => css`
  .MuiSlider-root,
  .MuiSlider-markLabel {
    color: ${property('theme.palette.error.main')};
  }

  .MuiSlider-thumb {
    background-color: ${property('theme.palette.error.main')};
  }
`;

export const validate = ({ error }) => !!error && debug();

export default (component) => styled(component)`
  ${validate};
  width: 100%;

  .MuiFormControlLabel-root {
    align-items: flex-start;
    display: flex;
    flex-direction: column-reverse;
    margin: 0;
  }
`;
