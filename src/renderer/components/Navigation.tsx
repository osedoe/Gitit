import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { requestWithToken } from '../utils/Oauth';
import { Colors } from '../utils/base';

const Container = styled.nav`
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const H1 = styled.h1``;

const Ul = styled.ul`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
`;

const Li = styled.li`
    background: transparent;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    //width: 50px;
    list-style-type: none;
`;

const AvatarWrapper = styled.div`
    box-sizing: border-box;
    border-radius: 50%;
    background: ${Colors.WHITE};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -20px;
    right: -20px;
    height: 110px;
    width: 110px;

    :hover {
        :before {
            content: '';
            box-sizing: border-box;
            height: 110px;
            width: 110px;
            position: absolute;
            top: -20px;
            right: -20px;
            border: 7px solid rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            z-index: 2;
        }

        :after {
            content: '';
            box-sizing: border-box;
            height: 110px;
            width: 110px;
            position: absolute;
            top: -20px;
            right: -20px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            z-index: 2;
        }
    }
`;

const Avatar = styled.img`
    box-shadow: 0 0 8px black;
    height: 110px;
    width: 110px;
    border-radius: 50%;
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
                    <Link to="/login">
                        {avatar ? (
                            <AvatarWrapper>
                                <Avatar src={avatar} alt="avatar"/>
                            </AvatarWrapper>
                        ) : (
                            <AvatarWrapper>LOGIN</AvatarWrapper>
                        )}
                    </Link>
                </Li>
            </Ul>
        </Container>
    );
};
