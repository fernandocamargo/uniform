import property from 'lodash/property';
import chroma from 'chroma-js';
import styled, { css } from 'styled-components';

export const debug = () => css`
  .MuiSlider-root {
    color: ${property('theme.palette.error.light')};
  }

  .MuiSlider-markLabel {
    color: ${({
      theme: {
        palette: {
          error: { main },
        },
      },
    }) => `rgba(${chroma(main).rgb()}, 0.6)`};
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
