import React, { FC } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
    box-sizing: border-box;
    border-radius: 2px;
    height: 60px;
    width: 60px;
`;

const ProfileImg = styled.img`
    border-radius: 3px;
    height: 100%;
    width: 100%;
`;

export interface AvatarProps {
  url: string;
}

export const Avatar: FC<AvatarProps> = ({ url }) => {
  return <Container>
    <ProfileImg src={url} alt="profile"/>
  </Container>;
};
