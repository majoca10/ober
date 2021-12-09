import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WhiteSpace } from 'antd-mobile';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { selectTripReducer } from '../../slices/tripSlice';
import styled from 'styled-components';
import ProfileIcon from '../presentational/ProfileIcon';
import { Card, Toast, Button, WingBlank, } from 'antd-mobile'
import { AntOutline, RightOutline } from 'antd-mobile-icons'
import { ADD_TRIP_STATUS, GET_TRIP, SET_ARRIVAL_DATA } from '../../queries/trip';
import { NOTIFY_DRIVER_STATE } from '../../queries/driver';


const Modal = styled.div`
  width: 100%;
  height: 25vh;
  margin: auto;
  padding: 12px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RiderName = styled.div`
  margin-left: 5px;
  text-align: left;
  font-size:20px;
  font-weight: bold;
`;

const PlaceInfo = styled.div`
  margin-top:1px; 
  margin-bottom: 8px;
  padding: 8px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  text-align: center;
  color: gray;
  word-wrap: break-word;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

function RiderPerfilCard() {




  return (
    <Page>
      <h1>Perfil</h1>
      <div>
      <WhiteSpace size="lg" />
      <Card full>
      <Card.Header
        title="Mauricio Jose Castro Vital"
        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        extra={<span>this is extra</span>}
      />
      <Card.Body>
        <div>This is content of `Card`</div>
      </Card.Body>
      <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
    </Card>
    <WhiteSpace size="lg" />
    </div>
      <Link to='/rider/setcourse'>
      <Button type="primary">Seleccionar Ruta</Button>
      </Link>
    </Page>
  );
}

export default RiderPerfilCard;
