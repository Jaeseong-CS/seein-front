import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

const TextBox: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const { inputProps, InputLabelProps, ...other } = { ...props };

  return (
    <TextField
      inputProps={{
        style: {
          fontFamily: 'Hi Melody',
          color: '#1a1a1a',
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
