import { useEffect } from 'react';
import { Overlay, Modal } from './ModalWindow.styled';

export const ModalWindow = ({ imageURL, imageTags, toggleModal }) => {
  const pressEsc = evt => {
    if (evt.code === 'Escape') {
      toggleModal();
    }
  };

  const handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', pressEsc);

    return () => {
      window.removeEventListener('keydown', pressEsc);
    };
  });

  return (
    <Overlay onClick={handleClick}>
      <Modal>
        <img src={imageURL} alt={imageTags} />
      </Modal>
    </Overlay>
  );
};
