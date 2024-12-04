import { useEffect, useState } from 'react';
import { ApiRequester } from '../../utils/ApiRequester';
import { toast } from 'react-toastify';

export function useUpdateInformationModal({ onUpdate, labelVariables, information, onClose }) {
  const [informationValue, setInformationValue] = useState('');
  const [informationType, setInformationType] = useState('');
  
  useEffect(() => {
    if(information) {
      const informationType = Object.keys(information)[0];

      setInformationType(informationType);
      setInformationValue(information[informationType]);
    }
  }, [information]);

  function handleChangeInformationValue(event) {
    if(informationType === 'cv' || informationType === 'profile_image') {
      setInformationValue(event);
    } else {
      setInformationValue(event.target.value);
    }
  }

  async function handleSubmit() {
    try {
      let body;

      if(informationType === 'cv') {
        const formData = new FormData();

        formData.append('cv', informationValue);

        body = formData;
      } else {
        body = {[informationType]: informationValue };
      }
      const { data, statusText } = await ApiRequester.put('/informations', body, {
        headers: {
          'Content-Type': typeof image === 'string' ? 'application/json' : 'multipart/form-data',
        }
      });

      onUpdate(typeof data !== 'object' && statusText === 'OK' ? informationValue : data);

      onClose();

      toast.success(`${labelVariables[informationType]} alterado com sucesso!`);
    } catch {
      //
    }
  }

  return {
    onSubmit: handleSubmit,
    onChange: handleChangeInformationValue,
    informationType,
    informationValue,
  };
}