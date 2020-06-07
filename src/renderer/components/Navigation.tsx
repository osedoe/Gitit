import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.nav``;

const Ul = styled.ul`
    display: grid;
    grid-template-columns: 150px 150px;
    grid-column-gap: 12px;
    justify-content: center;
    align-items: center;
`;

const Li = styled.li`
    background: #fff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 70px;
    list-style-type: none;
`;

export const Navigation: FC = () => {
    return (
        <Container>
            <Ul>
                <Li>
                    <Link to="/">Home</Link>
                </Li>
                <Li>
                    <Link to="/login">Login</Link>
                </Li>
            </Ul>
        </Container>
    );
};
