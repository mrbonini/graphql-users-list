import React from 'react';
import styled from 'styled-components';

const HiddenRadioButton = styled.input.attrs({
  type: 'radio',
})`
  height: 25px;
  width: 25px;
  cursor: pointer;
  position: absolute;
  opacity: 0;
`;

const RadioButton = styled.span`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: white;
  pointer-events: none;
  border: solid 0.5px rgba(0, 0, 0, 0.2);

  ${HiddenRadioButton}:checked + && {
    border: solid 0.5px #2d91fb;
    background: white;
    width: 2px;
    height: 2px;
    padding: 1.5px;
    box-shadow: 0px 0.25px 0.35px 5px #217fe2;
    margin: 0 0.25em;
  }
`;

export default function Radio(props) {
  const { value, checked, onClick } = props;

  return (
    <>
      <HiddenRadioButton checked={checked} value={value} onChange={onClick} />
      <RadioButton />
    </>
  )
  
};
