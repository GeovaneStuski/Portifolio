import { toast } from 'react-toastify';
import { ApiRequester } from '../../../../../../utils/ApiRequester';
import { useState } from 'react';

export function useDeleteProjectModal({ onDelete, onClose, project }) {
  const [loading, setLoading] = useState(false);

  async function handleDeleteProject() {
    try {
      setLoading(true);
      
      await ApiRequester.delete(`/projects/${project.id}`);
      
      setLoading(false);
      onDelete(project.id);
      toast.success('Projeto deletado!');
      onClose();
    } catch {
      toast.error('Erro ao deletar o projeto');
    }
  }

  return {
    loading,
    onDeleteProject: handleDeleteProject,
  };
}