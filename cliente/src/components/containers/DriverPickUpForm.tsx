import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation, useSubscription } from '@apollo/client';

import { Modal } from 'antd-mobile';

import { setOriginPosition, setDestPosition } from '../../slices/mapSlice';
import { LISTEN_MATCHED_RIDER_STATE, NOTIFY_DRIVER_STATE } from '../../queries/driver';
import { GET_ORIGIN_POSITION_AND_DESTINATION_POSITION } from '../../queries/trip';

import PickUpMap from '../containers/PickUpMap';
import RiderInfoBox from '../containers/RiderInfoBox';
import LoadingView from '../presentational/LoadingView';
import { selectMapReducer } from '../../slices/mapSlice';
import { selectTripReducer } from '../../slices/tripSlice';
import { useHistory } from 'react-router-dom';

const INIT_POS = {
  lat: 37.8035,
  lng: -122.46,
};

export default function DriverPickUpForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = Modal.alert;
  const [driverPos, setDriverPos] = useState(INIT_POS);
  const [riderPos, setRiderPos] = useState({ lat: undefined, lng: undefined });
  const [count, setCount] = useState(0);
  const { originPosition }: any = useSelector(selectMapReducer);
  const { trip }: any = useSelector(selectTripReducer);

  useQuery(GET_ORIGIN_POSITION_AND_DESTINATION_POSITION, {
    variables: { id: trip.id },
    onCompleted: ({ trip }) => {
      dispatch(setOriginPosition({ lat: trip.origin.latitude, lng: trip.origin.longitude }));
      dispatch(setDestPosition({ lat: trip.destination.latitude, lng: trip.destination.longitude }));
    },
  });

  const [notifyDriverState] = useMutation(NOTIFY_DRIVER_STATE);

  const { loading, error, data } = useSubscription(
    LISTEN_MATCHED_RIDER_STATE,
    { variables: { tripId: trip.id } },
  );

  const success = (position: Position): any => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setDriverPos(pos);
  };

  const navError = (): any => {
    console.log('Error: The Geolocation service failed.');
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
  };

  const getDriverPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, navError, options);
    }
  };

  useEffect(() => {
    getDriverPosition();
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  useEffect(() => {
    notifyDriverState({ variables: { tripId: trip.id, driverPosition: driverPos } });
  }, [driverPos]);

  useEffect(() => {
    if (data && data.matchedRiderState.latitude) {
      setRiderPos({ lat: data.matchedRiderState.latitude, lng: data.matchedRiderState.longitude });
    }
    if (data && data.matchedRiderState.trip.status === 'cancel') {
      alert('cancelación de llamada', 'el conductor canceló la llamada.', [{ text: 'OK', onPress: () => history.push('/driver/main') }]);
    }
  }, [data]);

  if (error) {
    return <p>error</p>;
  }
  if (loading) {
    return <LoadingView message={'Esperando la información de ubicación del pasajero.'}/>;
  }

  return (
    <>
      <PickUpMap
        isRider={false}
        riderLat={data.matchedRiderState.latitude}
        riderLng={data.matchedRiderState.longitude}
        driverLat={driverPos.lat}
        driverLng={driverPos.lng}
        pickUpLat={originPosition.lat}
        pickUpLng={originPosition.lng}
      />
      <RiderInfoBox onBoard={false} currentPos={driverPos}/>
    </>
  );
}

