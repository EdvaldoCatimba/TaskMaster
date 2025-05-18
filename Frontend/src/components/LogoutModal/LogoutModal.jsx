import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`;

const ModalContainer = styled(motion.div)`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background: #ccc;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #bbb;
  }
`;

const ConfirmButton = styled.button`
  background: #e53935;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #c62828;
  }
`;

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Title>Deseja realmente sair?</Title>
            <p>Você precisará fazer login novamente para acessar o sistema.</p>
            <ButtonGroup>
              <CancelButton onClick={onClose}>Cancelar</CancelButton>
              <ConfirmButton onClick={onConfirm}>Sair</ConfirmButton>
            </ButtonGroup>
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
