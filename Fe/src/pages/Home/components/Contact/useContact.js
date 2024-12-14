import { useContext, useState } from 'react';
import { DatasContext } from '../../../../contexts/DatasContext';

export function useContact() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [informationToBeUpdated, setInformationToBeUpdated] = useState(null);

  const { informations, onUpdateInformation } = useContext(DatasContext);

  function handleUpdateInformation(object) {
    setIsUpdateModalVisible(true);
    setInformationToBeUpdated(object);
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalVisible(false);
  }
  
  return {
    informations,
    isUpdateModalVisible,
    onUpdateInformation: handleUpdateInformation,
    onCloseModal: handleCloseUpdateModal,
    informationToBeUpdated,
    onUpdate: onUpdateInformation,
  };
}