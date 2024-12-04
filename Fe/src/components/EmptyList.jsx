import PropTypes from 'prop-types';
import { AddButton } from '../pages/Home/components/Technologies/components/AddButton';

export function EmptyList({ onCreate, type }) {
  return (
    <div className='flex flex-col gap-10 w-full items-center'>
      <span>Nem um{type.charAt(type.length - 1) === 'a' ? 'a' : ''} {type} cadastrada ainda? clique no botão abaixo para cadastrar!</span>
              
      <AddButton
        onCreate={onCreate}
        type={type}
      />
    </div>
  );
}

EmptyList.propTypes = {
  type: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
};