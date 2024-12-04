import { toast } from 'react-toastify';
import { ApiRequester } from '../../../../../../utils/ApiRequester';
import { useState } from 'react';

export function useDeleteTechnologyModal({ onDelete, technology, onClose }) {
  const [loading, setLoading] = useState(false);

  async function handleDeleteTechnology() {
    try {
      setLoading(true);

      await ApiRequester.delete(`/technologies/${technology.id}`);

      setLoading(false);
      onDelete(technology.id);
      toast.success('Technologia Deleteda!');
      onClose();
    } catch {
      toast.error('Erro ao deletar a technologia');
    }
  }

  return {
    onDeleteTechnology: handleDeleteTechnology,
    loading,
  };
}