import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 70px;
  right: 20px;
  width: 300px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
`;

const Notification = styled.div`
  padding: 0.5rem;
  background: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

export default function NotificationModal({ isOpen, onClose, notifications }) {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      {isOpen && (
        <ModalContainer>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Title>Notificações</Title>
          {notifications.length > 0 ? (
            notifications.map((n, index) => (
              <Notification key={index}>{n}</Notification>
            ))
          ) : (
            <Notification>Sem novas notificações.</Notification>
          )}
        </ModalContainer>
      )}
    </>
  );
}
