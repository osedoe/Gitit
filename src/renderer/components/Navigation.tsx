import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { requestWithToken } from '../utils/Oauth';
import { Colors } from '../utils/base';

const Container = styled.nav`
    box-shadow: 0 1px 10px -6px rgba(0, 0, 0, 0.42), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
        0 4px 5px -2px rgba(0, 0, 0, 0.1);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const H1 = styled.h1``;

const Ul = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0;
`;

const Li = styled.li`
    background: transparent;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    list-style-type: none;
`;

export const Navigation: FC = () => {
    const [avatar, setAvatar] = useState();
    const accessToken = window.localStorage.getItem('accessToken');

    useEffect(() => {
        if (window.localStorage.getItem('accessToken')) {
            requestWithToken('user')
                .then((response: any) => {
                    setAvatar(response.avatar_url);
                })
                .catch(error => console.warn('Error trying to retrieve avatar', error));
        }
    }, [avatar, accessToken]);

    return (
        <Container>
            <H1>GITIT</H1>
            <Ul>
                <Li>
                    <Link to="/">
                        <FaHome color={Colors.WHITE} size={30}/>
                    </Link>
                </Li>
                <Li>
                    <Link to="/login">{avatar ? 'LOGGED' : 'LOG IN'}</Link>
                </Li>
                <Li>
                    <Link to="/notifications">MSGS</Link>
                </Li>
            </Ul>
        </Container>
    );
};
