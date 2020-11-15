import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import React, { useEffect, useState } from 'react';
import Cookies from 'react-cookies';
import { useHistory } from 'react-router-dom';

type AuthorizationProps = {
  children: React.ReactNode;
}

const Authorization: React.FC<AuthorizationProps> = ({ children }: AuthorizationProps) => {
  const [verify, setVerify] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const tokenVerify = async () => {
      try {
        const accessToken = await Cookies.load('accessToken');
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/verify`, undefined, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response.status === StatusCodes.OK;
      } catch {
        return false;
      }
    };

    const tokenRefresh = async () => {
      try {
        const refreshToken = await Cookies.load('refreshToken');
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/auth/refresh`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );
        if (response.status === StatusCodes.OK) {
          const accessExpires = new Date();
          const refreshExpires = new Date();
          accessExpires.setTime(Date.now() + 1000 * 60 * 60 * 7);
          refreshExpires.setTime(Date.now() + 1000 * 60 * 60 * 24 * 7);
          Cookies.save('accessToken', response.data.accessToken, { expires: accessExpires });
          Cookies.save('refreshToken', response.data.refreshToken, { expires: refreshExpires });
          return true;
        }
        return false;
      } catch {
        return false;
      }
    };

    const authorization = async () => {
      const verified = await tokenVerify();
      if (!verified) {
        const refreshed = await tokenRefresh();
        if (!refreshed) {
          setVerify(false);
          history.push('/auth');
          return;
        }
      }
      setVerify(true);
    };

    authorization();
  }, [history]);

  return <>{verify && children}</>;
};

export default Authorization;
