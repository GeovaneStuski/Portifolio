import PropTypes from 'prop-types';
import { AddButtonTechnology } from '../../../../../components/AddButtonTechnology';

export function EmptyTechnologyList({ onCreate }) {
  return (
    <div className='flex items-center flex-col justify-center gap-8 text-center'>
      <span>Nem uma Technologia cadastrada ainda? clique no botão abaixo para cadastrar!</span>

      <AddButtonTechnology onCreate={onCreate}/>
    </div>
  );
}

EmptyTechnologyList.propTypes = {
  onCreate: PropTypes.func.isRequired,
};