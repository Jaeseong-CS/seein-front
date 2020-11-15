import React, { useEffect } from 'react';
import Cookies from 'react-cookies';
import { useHistory } from 'react-router-dom';

const SignOut: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    history.push('/');
  }, [history]);

  return <></>;
};

export default SignOut;
