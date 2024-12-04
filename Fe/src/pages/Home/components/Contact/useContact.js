import { useEffect, useState } from 'react';
import { ApiRequester } from '../../../../utils/ApiRequester';

export function useContact() {
  const [informations, setInformations] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [informationToBeUpdated, setInformationToBeUpdated] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await ApiRequester.get('/informations');

      setInformations(data);
    })();
  }, []);

  function handleUpdateInformation(object) {
    setIsUpdateModalVisible(true);
    setInformationToBeUpdated(object);
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalVisible(false);
  }

  function handleUpdate(informations) {
    if(informations instanceof File) {
      return;
    }
    
    setInformations(PrevState => informations ? informations : PrevState);
  }
  
  return {
    informations,
    isUpdateModalVisible,
    onUpdateInformation: handleUpdateInformation,
    onCloseModal: handleCloseUpdateModal,
    informationToBeUpdated,
    onUpdate: handleUpdate,
  };
}