import React from 'react';

import styled from 'styled-components';

import DriverSignUpFrom from '../components/containers/DriverSignUpFrom';
import Title from '../components/presentational/Title';
import SubTitle from '../components/presentational/SubTitle';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function DriverSignUpPage() {
  return (
    <Page>
      <Title content={'Regístrese como conductor'} />
      <SubTitle content={'Un vehículo seguro y confiable que llega en minutos'} />
      <DriverSignUpFrom />
    </Page>
  );
}

export default DriverSignUpPage;
