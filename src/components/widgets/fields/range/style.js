import property from 'lodash/property';
import chroma from 'chroma-js';
import styled, { css } from 'styled-components';

export const debug = () => css`
  .MuiSlider-root {
    color: ${property('theme.palette.error.main')};
  }

  .MuiSlider-thumb {
    background-color: ${property('theme.palette.error.main')};

    &.Mui-focusVisible {
      box-shadow: ${({
        theme: {
          palette: {
            error: { main },
          },
        },
      }) => `0px 0px 0px 8px rgb(${chroma(main).rgb().join(' ')} / 16%)`};
    }
  }

  .MuiSlider-markLabel {
    color: ${property('theme.palette.error.light')};
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
