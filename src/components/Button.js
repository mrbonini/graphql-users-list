import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: 1px solid
    ${(props) =>
      props.type === 'primary' ? '#0070c9' : props.type === 'secondary' ? '#ee0000' : 'black'};
  background: ${(props) => (props.type === 'primary' ? '#0070c9' : 'none')};
  color: ${(props) =>
    props.type === 'primary' ? '#ffffff' : props.type === 'secondary' ? '#ee0000' : 'black'};
  height: 28px;
  font-size: 13px;
  border-radius: 4px;
  padding: 7px 17px 6px;
  ${props => props.disabled ? 'border-color: #b8b8b8; color: #b8b8b8b8' : ''};
  display: flex;
  justify-content: center;
  align-items: center
`;
export default function Button(props) {
  const { children } = props;

  return <StyledButton {...props}>{children}</StyledButton>;
}