import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaSyncAlt } from 'react-icons/fa';
import { Colors, Config, requestWithAuth } from '../../utils';
import { Avatar } from './Avatar';
import { SignIn } from './SignIn';

const Container = styled.nav`
    background: ${Colors.DARK_GRAY};
    box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.42), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
        0 4px 5px -2px rgba(0, 0, 0, 0.1);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
`;

export const Navigation: FC = () => {
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    if (Config.getAuthHeader()) {
      requestWithAuth('user')
        .then(response => setAvatar(response.avatar_url))
        .catch(error => console.warn('Error trying to retrieve avatar', error));
    }
  }, [avatar]);

  return (
    <Container>
      <h1>GITIT</h1>
      <Link to="/">
        <FaSyncAlt color={Colors.WHITE} size={30}/>
      </Link>
      <Link to="/login">{avatar ? <Avatar url={avatar}/> : <SignIn/>}</Link>
    </Container>
  );
};
