import { DialogContentText, DialogContentTextProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  font-size: 0.8rem;
`;

const DialogText: React.FC<DialogContentTextProps> = (props: DialogContentTextProps) => {
  const { children, ...other } = { ...props };

  return (
    <DialogContentText {...other}>
      <Wrapper>{children}</Wrapper>
    </DialogContentText>
  );
};

export default DialogText;
