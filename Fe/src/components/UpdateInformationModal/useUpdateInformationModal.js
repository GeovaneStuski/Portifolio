import { useEffect, useState } from 'react';
import { ApiRequester } from '../../utils/ApiRequester';
import { toast } from 'react-toastify';

export function useUpdateInformationModal({ onUpdate, labelVariables, information, onClose }) {
  const [loading, setLoading] = useState(false);
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
    setInformationValue(event);
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      let body;

      if(informationValue instanceof File) {
        const formData = new FormData();

        formData.append(informationType, informationValue);

        body = formData;
      } else {
        body = {[informationType]: informationValue };
      }
      
      await ApiRequester.put('/informations', body, {
        headers: {
          'Content-Type': informationValue instanceof File ? 'multipart/form-data' : 'application/json',
        }
      });

      onUpdate({[informationType]: informationValue });
      toast.success(`${labelVariables[informationType]} alterado com sucesso!`);
    } catch {
      toast.error(`Erro ao editar ${labelVariables[informationType]}`);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return {
    onSubmit: handleSubmit,
    onChange: handleChangeInformationValue,
    informationType,
    informationValue,
    loading,
  };
}