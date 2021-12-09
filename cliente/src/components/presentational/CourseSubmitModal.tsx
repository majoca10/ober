import React, { useState } from 'react';

import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';

const CourseSubmitModal = ({ time, distance, onClick, disabled } : {time: any, distance: any, onClick: any, disabled: any}) => {
  const [modal, setModal] = useState(false);

  const showModal = (e: any) => {
    e.preventDefault();
    setModal(true);
  };
  const onClose = () => {
    setModal(false);
  };

  return (
    <WingBlank>
      <Button
        onClick={showModal}
        disabled={disabled}
        style={{ backgroundColor: '#56A902', color: '#FFFFFF', marginTop: '15px' }}
      >Selección de ruta completa</Button>
      <WhiteSpace />
      <Modal
        popup
        visible={modal}
        onClose={onClose}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>Comprueba la información de la ruta.</div>}>
          {([<List.Item key={1}>Tiempo previsto : {time}</List.Item>,
            <List.Item key={2}>distancia total : {distance}</List.Item>])}
          <List.Item>
            <Button type="primary"
              onClick={onClick}
              style={{ backgroundColor: '#ff4444' }}
            >Solicitar Conductor</Button>
          </List.Item>
        </List>
      </Modal>
    </WingBlank>
  );
};

export default CourseSubmitModal;
