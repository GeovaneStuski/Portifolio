import PropTypes from 'prop-types';
import { AddButton } from '../../../../../components/AddButton';

export function EmptyProjectList({ onOpenModal }) {
  return (
    <div className='flex text-center items-center flex-col justify-center gap-8'>
      <span>Nem um Projeto cadastrada ainda? clique no botão abaixo para cadastrar!</span>

      <AddButton onClick={onOpenModal}/>
    </div>
  );
}

EmptyProjectList.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};