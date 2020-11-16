import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const TextFieldEx = styled(TextField)`
  .MuiInput-underline:after {
    border-bottom-color: #ffc7c7 !important;
  }

  .Mui-focused {
    color: #ffc7c7 !important;
  }
`;

const TextBox: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const { inputProps, InputLabelProps, ...other } = { ...props };

  return (
    <TextFieldEx
      inputProps={{
        style: {
          fontFamily: 'Hi Melody',
          color: '#5b3f40',
        },
      }}
      InputLabelProps={{
        style: {
          fontFamily: 'Hi Melody',
        },
      }}
      {...other}
    />
  );
};

export default TextBox;
