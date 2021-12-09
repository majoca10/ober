import React from 'react';
import { Link } from 'react-router-dom';
import { WhiteSpace } from 'antd-mobile';


import styled from 'styled-components';
import RiderPerfilCard from '../components/containers/RiderPerfilCard'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #56A902;
  width: 100%;
  height: 50px;
  border: none;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  border-radius: 20px;
  margin: 10px;
`;

const Title = styled.h1`
  height: 29px;
  left: calc(50% - 89px/2 - 2.5px);
  top: calc(50% - 29px/2 - 329.5px);

  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 120px;
`;

export default function LoginPage() {
  return (
    <>
      <RiderPerfilCard />
    </>
  );
}