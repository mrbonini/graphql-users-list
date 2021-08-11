import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
  font-size: ${(props) => (props.size ? props.size : '34px')};
  color: ${(props) => (props.color ? props.color : '#000000')};
  &:hover {
    ${props => props.mouseOver ? 'color: #0070c9' : ''}
  }
`;

export default function Title(props) {
  const {children} = props;

  return <StyledSpan {...props}>{children}</StyledSpan>;
}