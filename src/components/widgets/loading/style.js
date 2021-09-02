import property from 'lodash/property';
import styled from 'styled-components';

export default (component) => styled(component)`
  ${property('theme.typography.subtitle1')};
  margin: 1rem;
`;
