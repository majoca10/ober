import React from 'react';

import styled from 'styled-components';

import RiderSignUpForm from '../components/containers/RiderSignUpForm';
import Title from '../components/presentational/Title';
import SubTitle from '../components/presentational/SubTitle';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RiderSignUpPage() {
  return (
    <Page>
      <Title content={'Registrece como Usuario'}/>
      <SubTitle content={'Para que llegue un vehiculo seguro y confiable en minutos'} />
      <RiderSignUpForm />
    </Page>
  );
}

export default RiderSignUpPage;
