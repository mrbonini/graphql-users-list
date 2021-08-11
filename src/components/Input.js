import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  ${props => props.type === 'text' ? 'box-shadow: 0 0 0 3.5px rgba(59, 153, 252, 0.5), inset 0 0 0 0.5px #b9b9b9, inset 0 0 0 1px rgba(0, 0, 0, 0.05);background-color: #fff;border: 0;padding: 4px 4px 2px;margin: 0.75em 0;' : ''}
`