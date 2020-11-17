import {
  Button, Dialog, DialogActions, DialogContent,
} from '@material-ui/core';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'react-cookies';
import { useHistory } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import DialogText from '../components/DialogText';
import DialogTitle from '../components/DialogTitle';
import TextBox from '../components/TextBox';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 80%;
  height: 70vh;
  background-color: #ffffff;
  border-radius: 16px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    margin-top: 1.5rem;
    margin-bottom: 2.7rem;
    height: 17rem;
  }
`;

const Panel = styled.div`
  margin: auto;
  display: flex;
  position: relative;
  top: 1.5rem;
  width: 30%;
  flex-direction: column;
  transition: 0.4s ease-in-out;
  margin: auto;

  @media screen and (max-width: 1024px) {
    width: 80%;
  }
`;

const InPanel = styled(Panel)`
  display: none;
  opacity: 0;
  margin-left: 10%;

  @media screen and (max-width: 1024px) {
    margin-top: 3rem;
  }
`;

const UpPanel = styled(Panel)`
  display: flex;
  margin-right: 10%;

  @media screen and (max-width: 1024px) {
    margin-top: -0.2rem;
  }
`;

const LeftToRight = keyframes`
  0% {
    left: 10%;
    right: auto;
    width: 40%;
  }
  30% {
    width: 52%;
  }
  40% {
    width: 52%;
  }
  100% {
    left: 50%;
    right: auto;
    width: 40%;
  }
`;

const RightToLeft = keyframes`
  0% {
    left: auto;
    right: 10%;
    width: 40%;
  }
  30% {
    width: 52%;
  }
  40% {
    width: 52%;
  }
  100% {
    left: auto;
    right: 50%;
    width: 40%;
  }
`;

const Overlay = styled.div<{ animation: any }>`
  display: flex;
  position: absolute;
  left: 10%;
  right: auto;
  margin: auto 0;
  width: 40%;
  height: 70vh;
  z-index: 99;
  background-color: #ffc7c7;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  transform: scale(1.1);
  ${({ animation }) => animation};

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const OverlayItemContainer = styled.div`
  width: 85%;
  transition: opacity 0.2s ease-in-out;
`;

const OverlayTitle = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #5b3f40;
`;

const OverlayContent = styled.div`
  margin: 2rem auto;
  text-align: center;
  white-space: pre-wrap;
  font-size: 2vw;
  color: #5b3f40;
`;

const OverlayButton = styled(Button)`
  margin-top: 1.5rem !important;
  width: 100%;

  .MuiButton-label {
    color: #5b3f40 !important;
  }
`;

const TextBoxEx = styled(TextBox)`
  width: 100%;
  margin-bottom: 0.4rem !important;
`;

const ButtonEx = styled(Button)`
  margin-top: 1.6rem !important;
  margin-bottom: 3rem !important;

  .MuiButton-label {
    color: #5b3f40 !important;
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: 1rem !important;
  }
`;

const PanelButton = styled(Button)`
  display: none !important;
  width: 3rem;
  margin-top: -0.625rem !important;
  margin-left: auto !important;

  .MuiButton-label {
    color: #aaaaaa !important;
    font-size: 0.625rem !important;
  }

  @media screen and (max-width: 1024px) {
    display: block !important;
  }
`;

const Auth: React.FC = () => {
  const upOverlayTitle = '오랜만이네요!';
  const upOverlayContent = '어서 로그인해서 다시 시를 작성해봐요!';
  const upOverlayButton = '회원가입하기';
  const inOverlayTitle = '안녕하세요!';
  const inOverlayContent = 'See In은 시를 작성하여 다른 사람들과 공유할 수 있는 서비스입니다.\nSee In은 시인과 발음이 비슷하고, 사물을 바라보는 시인의 모습을 담고 있습니다.';
  const inOverlayButton = '로그인하기';
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContentText, setDialogContentText] = useState('');
  const [open, setOpen] = useState(false);
  const [overlayTitle, setOverlayTitle] = useState(inOverlayTitle);
  const [overlayContent, setOverlayContent] = useState(inOverlayContent);
  const [overlayButton, setOverlayButton] = useState(inOverlayButton);
  const [animation, setAnimation] = useState(css``);
  const isLeft = useRef(true);
  const inPanel = useRef<HTMLDivElement>(null);
  const inEmail = useRef<HTMLInputElement>(null);
  const inPassword = useRef<HTMLInputElement>(null);
  const inButton = useRef<HTMLButtonElement>(null);
  const upPanel = useRef<HTMLDivElement>(null);
  const upName = useRef<HTMLInputElement>(null);
  const upEmail = useRef<HTMLInputElement>(null);
  const upPassword = useRef<HTMLInputElement>(null);
  const upPasswordVerify = useRef<HTMLInputElement>(null);
  const upButton = useRef<HTMLButtonElement>(null);
  const overlayItemContainer = useRef<HTMLDivElement>(null);
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
        Cookies.save('signin', '1', {});
        history.push('/');
      }
    } catch (err) {
      if (!err.response.status) {
        handleOpen('알 수 없는 오류', err.toString());
        return;
      }
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
        changePanel();
        Cookies.save('signin', '1', {});
      }
    } catch (err) {
      if (!err.response.status) {
        handleOpen('알 수 없는 오류', err.toString());
        return;
      }
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

  const changePanel = () => {
    const widthCheck = Number.parseFloat(getComputedStyle(document.body).width.split('px')[0]) > 1024;
    if (isLeft.current) {
      setAnimation(
        css`
          animation: ${LeftToRight} 1s ease-in-out both;
        `,
      );
      overlayItemContainer.current!.style.opacity = '0';
      inPanel.current!.style.opacity = '0';
      if (widthCheck) {
        upPanel.current!.style.marginRight = '30%';
        setTimeout(() => {
          setOverlayTitle(upOverlayTitle);
          setOverlayContent(upOverlayContent);
          setOverlayButton(upOverlayButton);
          overlayItemContainer.current!.style.opacity = '1';
        }, 900);
      }
      setTimeout(
        () => {
          upPanel.current!.style.display = 'none';
          inPanel.current!.style.display = 'flex';
          inPanel.current!.style.marginLeft = '10%';
        },
        widthCheck ? 500 : 200,
      );
      setTimeout(
        () => {
          inPanel.current!.style.opacity = '1';
        },
        widthCheck ? 550 : 250,
      );
    } else {
      setAnimation(
        css`
          animation: ${RightToLeft} 1s ease-in-out both;
        `,
      );
      overlayItemContainer.current!.style.opacity = '0';
      upPanel.current!.style.opacity = '0';
      if (widthCheck) {
        inPanel.current!.style.marginLeft = '30%';
        setTimeout(() => {
          setOverlayTitle(inOverlayTitle);
          setOverlayContent(inOverlayContent);
          setOverlayButton(inOverlayButton);
          overlayItemContainer.current!.style.opacity = '1';
        }, 900);
      }
      setTimeout(
        () => {
          inPanel.current!.style.display = 'none';
          upPanel.current!.style.display = 'flex';
          upPanel.current!.style.marginRight = '10%';
        },
        widthCheck ? 500 : 200,
      );
      setTimeout(
        () => {
          upPanel.current!.style.opacity = '1';
        },
        widthCheck ? 550 : 250,
      );
    }
    isLeft.current = !isLeft.current;
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

  useEffect(() => {
    const signinCheck = async () => {
      const signin = await Cookies.load('signin');
      if (signin) {
        isLeft.current = false;
        setAnimation(
          css`
            animation: ${LeftToRight} 0s ease-in-out both;
          `,
        );
        setOverlayTitle(upOverlayTitle);
        setOverlayContent(upOverlayContent);
        setOverlayButton(upOverlayButton);
        inPanel.current!.style.marginLeft = '10%';
        inPanel.current!.style.display = 'flex';
        inPanel.current!.style.opacity = '1';
        upPanel.current!.style.display = 'none';
      }
    };

    signinCheck();
  }, []);

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
      <Overlay animation={animation}>
        <OverlayItemContainer ref={overlayItemContainer}>
          <OverlayTitle>{overlayTitle}</OverlayTitle>
          <OverlayContent>{overlayContent}</OverlayContent>
          <OverlayButton variant="outlined" disableElevation onClick={changePanel}>
            {overlayButton}
          </OverlayButton>
        </OverlayItemContainer>
      </Overlay>
      <InPanel ref={inPanel}>
        <TextBoxEx type="email" label="이메일" inputRef={inEmail} onKeyPress={inSubmit} />
        <TextBoxEx type="password" label="비밀번호" inputRef={inPassword} onKeyPress={inSubmit} />
        <ButtonEx variant="outlined" disableElevation onClick={signIn} ref={inButton}>
          로그인
        </ButtonEx>
        <PanelButton disableElevation onClick={changePanel}>
          회원가입
        </PanelButton>
      </InPanel>
      <UpPanel ref={upPanel}>
        <TextBoxEx type="text" label="닉네임" inputRef={upName} onKeyPress={upSubmit} />
        <TextBoxEx type="email" label="이메일" inputRef={upEmail} onKeyPress={upSubmit} />
        <TextBoxEx type="password" label="비밀번호" inputRef={upPassword} onKeyPress={upSubmit} />
        <TextBoxEx
          type="password"
          label="비밀번호 확인"
          inputRef={upPasswordVerify}
          onKeyPress={upSubmit}
        />
        <ButtonEx variant="outlined" disableElevation onClick={signUp} ref={upButton}>
          회원가입
        </ButtonEx>
        <PanelButton disableElevation onClick={changePanel}>
          로그인
        </PanelButton>
      </UpPanel>
    </Container>
  );
};

export default Auth;
