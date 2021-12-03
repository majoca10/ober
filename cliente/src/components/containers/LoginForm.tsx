import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useMutation } from '@apollo/client';

import { WhiteSpace, Checkbox } from 'antd-mobile';

import styled from 'styled-components';

import { LOGIN_RIDER, LOGIN_DRIVER } from '../../queries/login';
import { setLoginRole } from '../../slices/loginSlice';
import { setTrip } from '../../slices/tripSlice';

import { checkValidation } from '../../utils/validate';

import Input from '../presentational/Input';
import SubmitButton from '../presentational/SubmitButton';
import LoadingView from '../presentational/LoadingView';


const Div = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Header = styled.div`
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;

  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 77px;

  color: #243443;
`;

const CheckContent = styled.div`
  padding-left: 10px;
`;

const SignupButton = styled.button`
  width:100%;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bolder;
  color: #56A902;
  border: none;
  background-color: transparent;
`;

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginRider, { data: riderData, loading: riderLoading, error: riderError }] = useMutation(
    LOGIN_RIDER,
    {
      onCompleted: ({ loginRider }) => {
        const { message, success, token, user } = loginRider;
        if (success) {
          localStorage.setItem('token', token);
          dispatch(setLoginRole(user.role));
          dispatch(setTrip({ id: user.tripId }));
          history.push('/rider/setcourse');
        } else {
          window.alert(message);
          history.push('/login');
        }
      },
    },
  );
  const [loginDriver, { data: driverData, loading: driverLoading, error: driverError }] = useMutation(
    LOGIN_DRIVER,
    {
      onCompleted: ({ loginDriver }) => {
        const { message, success, token, user } = loginDriver;
        if (success) {
          localStorage.setItem('token', token);
          dispatch(setLoginRole(user.role));
          dispatch(setTrip({ id: user.tripId }));
          history.push('/driver/main');
        } else {
          window.alert(message);
          history.push('/login');
        }
      },
    },
  );

  const [riderCheck, setRiderCheck] = useState(true);
  const [driverCheck, setDriverCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidate, setIsValidate] = useState(false);

  const handleChangeInput = (setState: any) => (value: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  const handleLoginButtonClick = async () => {
    riderCheck
      ? await loginRider({ variables: { email, password } })
      : await loginDriver({ variables: { email, password } });
  };

  const checkToggle = (e: any) => {
    if (e.target.children === 'usuario' && !riderCheck) {
      setRiderCheck(true);
      setDriverCheck(false);
    }
    if (e.target.children === 'conductor' && !driverCheck) {
      setRiderCheck(false);
      setDriverCheck(true);
    }
  };

  const propertyToCheck = { email, password };
  const propertyToWatch = [email, password];

  useEffect(() => {
    checkValidation(propertyToCheck, setIsValidate);
  }, propertyToWatch);

  if (riderLoading || driverLoading) {
    return <LoadingView />;
  }

  return (
    <Div>
      {riderError && <p>try again</p>}
      <Header>OBER</Header>
      <CheckContent>
        <Checkbox
          onChange={checkToggle}
          checked={riderCheck}
          style={{ margin: '0 5px 10px 0' }}
        >
          usuario
        </Checkbox>
        <Checkbox
          onChange={checkToggle}
          checked={driverCheck}
          style={{ margin: '0 5px 10px 10px' }}
        >
          conductor
        </Checkbox>
      </CheckContent>
      <WhiteSpace />
      <Input
        type='text'
        placeholder='Enter your email'
        onChange={handleChangeInput(setEmail)}
      />
      <WhiteSpace />
      <Input
        type='password'
        placeholder='Enter your password'
        onChange={handleChangeInput(setPassword)}
      />
      <WhiteSpace size='xl' />
      <SubmitButton
        content={'Ingresar'}
        onClick={handleLoginButtonClick}
        disabled={!isValidate}
      />
      <Link to='/signup/select'>
        <SignupButton>Registrarme</SignupButton>
      </Link>
    </Div>
  );
}

export default LoginForm;
