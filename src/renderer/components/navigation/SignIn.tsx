import React, { FC } from "react";
import styled from "@emotion/styled";
import { FaUserCircle } from "react-icons/fa";
import { Colors } from "../../utils";

const Container = styled.div`
    box-sizing: border-box;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
`;

const DefaultAvatar = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    height: 100%;
    width: 100%;
`;

const P = styled.p`
    color: ${Colors.WHITE};
    font-size: 14px;
    margin: 0;
    padding: 4px;
`;

export const SignIn: FC = () => {
  return <Container>
    <DefaultAvatar>
      <FaUserCircle color={Colors.WHITE} size={30}/>
      <P>Login</P>
    </DefaultAvatar>
  </Container>;
};
