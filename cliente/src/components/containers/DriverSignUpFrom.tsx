import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { WhiteSpace } from 'antd-mobile';

import { useMutation } from '@apollo/client';

import Input from '../presentational/Input';
import DiscriptionInput from '../presentational/DescriptionInput';
import SubmitButton from '../presentational/SubmitButton';

import { SIGNUP_DRIVER } from '../../queries/signup';

import { checkValidation } from '../../utils/validate';

const Form = styled.form`
  width: 90%;
`;

function DriverSignUpFrom() {
  const history = useHistory();
  const [signUpDriver] = useMutation(SIGNUP_DRIVER);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [carType, setCarType] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [isValidate, setIsValidate] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  const handleSignUpButton = async () => {
    const driverInfo = { name, phoneNumber, email, password, carType, plateNumber };
    try {
      await signUpDriver({ variables: driverInfo });
      window.alert('Registro exitosa');
      history.push('/login');
    } catch (error) {
      window.alert(`Ocurrio un error\n porque${error}`);
    }
  };

  const propertyToCheck = { name, phoneNumber, email, password, rePassword, carType, plateNumber };
  const propertyToWatch = [name, phoneNumber, email, password, rePassword, carType, plateNumber];

  useEffect(() => {
    checkValidation(propertyToCheck, setIsValidate);
  }, propertyToWatch);

  return (
    <Form>
      <DiscriptionInput placeholder='Nombre' />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='Nombre'
        onChange={handleChangeInput(setName)}
      />
      <WhiteSpace />
      <Input
        type='phone'
        placeholder='Celular'
        onChange={handleChangeInput(setPhoneNumber)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='Email'
        onChange={handleChangeInput(setEmail)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='Password'
        onChange={handleChangeInput(setPassword)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='Repetir Password'
        onChange={handleChangeInput(setRePassword)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='Tipo de vehiculo'
        onChange={handleChangeInput(setCarType)}
      />
      <WhiteSpace />
      <Input
        type='text'
        placeholder='Número de vehículo'
        onChange={handleChangeInput(setPlateNumber)}
      />
      <WhiteSpace />
      <SubmitButton
        content={'Inscribirse'}
        onClick={handleSignUpButton}
        disabled={!isValidate}
      />
    </Form>
  );
}

export default DriverSignUpFrom;
