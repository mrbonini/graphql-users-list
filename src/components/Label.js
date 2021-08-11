import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  color: ${(props) => (props.color ? props.color : '#252525')};
  font-size: ${(props) => (props.size ? props.size : '13px')};
  letter-spacing: -0.08px;
`;

export default function Label({children, ...rest}) {
  // const { children } = props
  return <StyledLabel {...rest}>{children}</StyledLabel>;
}