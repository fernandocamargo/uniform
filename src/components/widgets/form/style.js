import property from 'lodash/property';
import styled from 'styled-components';

export default (component) => styled(component)`
  display: block;
  margin: 1.5rem auto;
  max-width: 50vw;

  & > {
    fieldset {
      & > {
        legend {
          ${property('theme.typography.h5')};
          text-align: center;
        }

        div {
          &[aria-roledescription='controls'],
          &[aria-roledescription='field'] {
            margin: 1.5rem 0;
          }

          &[aria-roledescription='controls'] {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
          }
        }
      }
    }

    pre {
      background-color: #feffe1;
      border: solid 1px #000;
      box-shadow: 0 8px 8px -4px rgba(0, 0, 0, 0.25);
      margin: 1.5rem auto;
      max-width: calc(50vw - (3rem + 2px));
      padding: 1.5rem;
    }
  }
`;
