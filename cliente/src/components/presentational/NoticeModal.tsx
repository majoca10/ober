import React, { FunctionComponent, useState, useEffect, memo } from 'react';

import { Modal } from 'antd-mobile';

interface NoticeModalProps {
  lat: number
  lng: number
}

const NoticeModal: FunctionComponent<NoticeModalProps> = ({ lat, lng }) => {
  const [isVibislbe, setIsVibislbe] = useState(false);
  const isKorea = lng >= 124 && lng <= 132 && lat >= 33 && lat <= 43;

  useEffect(() => {
    if (isKorea) {
      setIsVibislbe(true);
      return;
    }
    setIsVibislbe(false);
  }, [lat]);

  return (
    <Modal
      visible={isVibislbe}
      transparent
      maskClosable={true}
      onClose={() => setIsVibislbe(false)}
      title="🚨 aviso"
      style={{ fontSize: '20px' }}
      footer={[{ text: 'cerrar', onPress: () => {
        setIsVibislbe(false);
      } }]}
    >
      <div style={{ height: 360, fontSize: '17px' }}>
        <br />
        <strong>cambiar la ubicación actual</strong>Por favor
        <br />
        <br />
        <br />
        <strong>───── Cómo establecer ─────</strong><br />
        1. Abrir herramientas para desarrolladores de Chrome<br />
        2. control Devtools hacer clic<br />
        3. More tools - Sensors hacer clic<br />
        4. Location para establecer la ubicación actual<br />
      </div>
    </Modal>
  );
};

export default memo(NoticeModal);
