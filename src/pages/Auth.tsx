import {
  Button, Dialog, DialogActions, DialogContent,
} from '@material-ui/core';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, { useRef, useState } from 'react';
import Cookies from 'react-cookies';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import DialogText from '../components/DialogText';
import DialogTitle from '../components/DialogTitle';
import TextBox from '../components/TextBox';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90%;
  height: 60vh;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  display: flex;
  margin: auto;
  width: 13rem;
  flex-direction: column;
`;

const TextBoxEx = styled(TextBox)`
  width: 100%;
`;

const TextBoxWrapper = styled.div`
  margin-bottom: 0.4rem;
`;

const Auth: React.FC = () => {
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContentText, setDialogContentText] = useState('');
  const [open, setOpen] = useState(false);
  const inEmail = useRef<HTMLInputElement>(null);
  const inPassword = useRef<HTMLInputElement>(null);
  const inButton = useRef<HTMLButtonElement>(null);
  const upName = useRef<HTMLInputElement>(null);
  const upEmail = useRef<HTMLInputElement>(null);
  const upPassword = useRef<HTMLInputElement>(null);
  const upPasswordVerify = useRef<HTMLInputElement>(null);
  const upButton = useRef<HTMLButtonElement>(null);
  const history = useHistory();

  const signIn = async () => {
    try {
      const email = inEmail.current?.value;
      const password = inPassword.current?.value;
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signin`, {
        email,
        password,
      });
      if (res.status === StatusCodes.OK) {
        const { token } = res.data;
        const accessExpires = new Date();
        const refreshExpires = new Date();
        accessExpires.setTime(Date.now() + 1000 * 60 * 60 * 7);
        refreshExpires.setTime(Date.now() + 1000 * 60 * 60 * 24 * 7);
        Cookies.save('accessToken', token.accessToken, { expires: accessExpires });
        Cookies.save('refreshToken', token.refreshToken, { expires: refreshExpires });
        history.push('/');
      }
    } catch (err) {
      switch (err.response.status) {
        case StatusCodes.UNAUTHORIZED:
          handleOpen('로그인 오류', '비밀번호가 틀렸습니다.');
          break;
        case StatusCodes.NOT_FOUND:
          handleOpen('로그인 오류', '이메일이 존재하지 않습니다.');
          break;
        default:
          handleOpen('알 수 없는 오류', err.toString());
          break;
      }
    }
  };

  const signUp = async () => {
    try {
      const name = upName.current?.value;
      const email = upEmail.current?.value;
      const password = upPassword.current?.value;
      const passwordVerify = upPasswordVerify.current?.value;
      if (password !== passwordVerify) {
        handleOpen('비밀번호 오류', '비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        return;
      }
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/signup`, {
        name,
        email,
        password,
      });
      if (res.status === StatusCodes.OK) {
        handleOpen('회원가입 성공', '왼쪽에서 로그인을 해주세요.');
      }
    } catch (err) {
      switch (err.response.status) {
        case StatusCodes.BAD_REQUEST:
          handleOpen('회원가입 실패', err.response.data);
          break;
        default:
          handleOpen('알 수 없는 오류', err.toString());
          break;
      }
    }
  };

  const handleOpen = (title: string, contentText: string) => {
    setDialogTitle(title);
    setDialogContentText(contentText);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inSubmit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      inButton.current!.click();
    }
  };

  const upSubmit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      upButton.current!.click();
    }
  };

  return (
    <Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogText>{dialogContentText}</DialogText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Panel>
        <TextBoxWrapper>
          <TextBoxEx
            type="email"
            label="이메일"
            inputRef={inEmail}
            inputProps={{ onKeyPress: inSubmit }}
          />
        </TextBoxWrapper>
        <TextBoxWrapper>
          <TextBoxEx
            type="password"
            label="비밀번호"
            inputRef={inPassword}
            inputProps={{ onKeyPress: inSubmit }}
          />
        </TextBoxWrapper>
        <Button variant="contained" disableElevation onClick={signIn} ref={inButton}>
          로그인
        </Button>
      </Panel>
      <Panel>
        <TextBoxWrapper>
          <TextBoxEx
            type="text"
            label="닉네임"
            inputRef={upName}
            inputProps={{ onKeyPress: upSubmit }}
          />
        </TextBoxWrapper>
        <TextBoxWrapper>
          <TextBoxEx
            type="email"
            label="이메일"
            inputRef={upEmail}
            inputProps={{ onKeyPress: upSubmit }}
          />
        </TextBoxWrapper>
        <TextBoxWrapper>
          <TextBoxEx
            type="password"
            label="비밀번호"
            inputRef={upPassword}
            inputProps={{ onKeyPress: upSubmit }}
          />
        </TextBoxWrapper>
        <TextBoxWrapper>
          <TextBoxEx
            type="password"
            label="비밀번호 확인"
            inputRef={upPasswordVerify}
            inputProps={{ onKeyPress: upSubmit }}
          />
        </TextBoxWrapper>
        <Button variant="contained" disableElevation onClick={signUp} ref={upButton}>
          회원가입
        </Button>
      </Panel>
    </Container>
  );
};

export default Auth;
