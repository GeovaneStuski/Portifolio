import PropTypes from 'prop-types';

import { useDeleteProjectModal } from './useDeleteProjectModal';

import { Modal } from '../../../../../../components/Modal';


export function DeleteProjectModal({ isVisible, onClose, project, onDelete }) {
  const { loading, onDeleteProject } = useDeleteProjectModal({ onClose, onDelete, project });

  if(!project) return;

  return (
    <Modal
      title="Deletar Projeto"
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={onDeleteProject}
      confirmLabel="Deletar"
      isLoading={loading}
    >
      <div className='flex justify-center text-center'>
        <span>Tem certeza que deseja excluir o Projeto &quot;{project.title}&quot; ?</span>
      </div>
    </Modal>
  );
}

DeleteProjectModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })
};