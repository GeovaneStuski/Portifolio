import PropTypes from 'prop-types';

import { Modal } from '../../../../../../components/Modal';

import { useDeleteTechnologyModal } from './useDeleteTechnologyModal';

export function DeleteTechnologyModal({ isVisible, onClose, technology, onDelete }) {
  const {
    onDeleteTechnology,
    loading,
  } = useDeleteTechnologyModal({ onDelete, technology, onClose });

  if(!technology) return;

  return (
    <Modal
      title="Deletar Technologia"
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={onDeleteTechnology}
      confirmLabel="Deletar"
      isLoading={loading}
    >
      <div className='flex justify-center text-center'>
        <span>Tem certeza que deseja excluir a Technologia &quot;{technology.name}&quot; ?</span>
      </div>
    </Modal>
  );
}

DeleteTechnologyModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  technology: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};