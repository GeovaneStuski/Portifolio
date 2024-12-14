import PropTypes from 'prop-types';

import { useUpdateInformationModal } from './useUpdateInformationModal';

import { Modal } from '../Modal';
import { Input } from '../Input';
import { FileInput } from '../FileInput';
import { TextArea } from '../TextArea';

const labelVariables = {
  phone: 'Telefone',
  email: 'E-mail',
  'cv': 'Curriculo',
  'linkedin': 'Perfil Linkedin',
  'github': 'Perfil Github',
  profile_image: 'Imagem de perfil',
  'about_text': 'Texto sobre mim'
};  

export function UpdateInformationModal({ isVisible, onClose, information, onUpdate }) {
  const {
    onSubmit,
    onChange,
    informationType,
    informationValue,
    loading,
  } = useUpdateInformationModal({ onUpdate, labelVariables, information, onClose });

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      isLoading={loading}
      title={`Editar ${labelVariables[informationType]}`}
      confirmLabel={`Editar ${labelVariables[informationType]}`}
      onConfirm={onSubmit}
      disabled={!informationValue || information[informationType] === informationValue}
    >
      <>
        {informationType === 'cv' || informationType === 'profile_image' ? (
          <FileInput
            value={informationValue}
            onChange={onChange}
            expectType={informationType === 'cv' ? 'cv' : 'image'}
          />
        ) : (
          informationType?.includes('text') ? (
            <TextArea
              onChange={onChange}
              value={informationValue === null ? '' : informationValue}
            />
          ) : (
            <Input
              value={informationValue}
              onChange={onChange}
            />
          )
        )}
      </>
    </Modal>
  );
}

UpdateInformationModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  information: PropTypes.object,
};