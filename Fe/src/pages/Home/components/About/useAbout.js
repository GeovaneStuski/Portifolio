import { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { DatasContext } from '../../../../contexts/DatasContext';

export function useAbout() {
  const [informationToBeUpdated, setInformationToBeUpdated] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { authenticated } = useContext(AuthContext);
  const { informations, onUpdateInformation } = useContext(DatasContext);

  function handleOpenModal(information) {
    setInformationToBeUpdated(information);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return {
    text: informations?.about_text,
    image: informations?.profile_image,
    onUpdate: onUpdateInformation,
    isModalVisible,
    onOpenModal: handleOpenModal,
    onCloseModal: handleCloseModal,
    informationToBeUpdated,
    authenticated
  };
}