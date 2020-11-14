import { DialogTitle, DialogTitleProps } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  font-size: 1.3rem;
`;

const DialogTitleWrapper: React.FC<DialogTitleProps> = (props: DialogTitleProps) => {
  const { children, ...other } = { ...props };

  return (
    <DialogTitle {...other}>
      <Wrapper>{children}</Wrapper>
    </DialogTitle>
  );
};

export default DialogTitleWrapper;
