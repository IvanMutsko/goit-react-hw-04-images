import { useEffect } from 'react';
import { Overlay, Modal } from './ModalWindow.styled';

export const ModalWindow = ({ imageURL, imageTags, toggleModal }) => {
  useEffect(() => {
    const pressEsc = evt => {
      if (evt.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', pressEsc);

    return () => {
      window.removeEventListener('keydown', pressEsc);
    };
  }, [toggleModal]);

  const handleClick = evt => {
    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  return (
    <Overlay onClick={handleClick}>
      <Modal>
        <img src={imageURL} alt={imageTags} />
      </Modal>
    </Overlay>
  );
};
