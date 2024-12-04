import PropTypes from 'prop-types';

import { useProjectModal } from './useProjectModal';

import { Modal } from '../../../../../../components/Modal';
import { Input } from '../../../../../../components/Input';
import { TextArea } from '../../../../../../components/TextArea';
import { Technology } from './components/Technology';
import { AddButtonTechnology } from '../../../../../../components/AddButtonTechnology';

import cn from '../../../../../../utils/cn';
import { FileInput } from '../../../../../../components/FileInput';

export function ProjectModal({ isVisible, onClose, onCreate, onUpdate, project }) {
  const {
    technologies,
    onChangeTechnology,
    technologiesList,
    description,
    onChangeDescription,
    onChangeRepotoryLink,
    onChangeTitle,
    repositoryLink,
    title,
    image,
    onChangeImage,
    onSubmit,
    onCreateTechnology,
    isFormValid,
    loading
  } = useProjectModal({ onCreate, isVisible, project, onClose, onUpdate });

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title={project ? 'Editar Projeto' : 'Novo Projeto'}
      confirmLabel={project ? 'Editar Projeto' : 'Criar Projeto'}
      onConfirm={onSubmit}
      size={900}
      disabled={!isFormValid}
      isLoading={loading}
    >
      <div className='h-[600px] flex flex-col overflow-auto scrollbar-none xsm:flex-row gap-4'>
        <section className='w-full flex flex-col flex-1 gap-2'>
          <FileInput
            value={image}
            onChange={onChangeImage}
            expectType='image'
          />

          <Input 
            label='Titulo'
            onChange={onChangeTitle}
            value={title}
          />
    
          <TextArea
            label='Descrição'
            onChange={onChangeDescription}
            value={description}
          />

          <Input 
            label='Link do repositorio'
            onChange={onChangeRepotoryLink}
            value={repositoryLink}
          />
        </section>

        <section className='w-full flex flex-col flex-1 h-full max-h-96 xsm:max-h-full'>
          <span>Technologias</span>

          <div className={cn('grid grid-cols-1 gap-3 mt-2 overflow-auto', {
            'pr-1': technologies.length > 5
          })}>
            {technologies.map((technology) => (
              <Technology
                key={technology.id}
                technology={technology}
                technologiesList={technologiesList}
                onChangeTechnology={onChangeTechnology}
              />
            ))}

            <AddButtonTechnology onCreate={onCreateTechnology}/>
          </div>
        </section>
      </div>
    </Modal>
  );
}

ProjectModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagepath: PropTypes.string.isRequired,
    repositorylink: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired, 
    })).isRequired,
  })
};