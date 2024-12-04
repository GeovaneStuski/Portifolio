import { BsFillTrashFill, BsPenFill } from 'react-icons/bs';
import { Button } from '../../../../../../../components/Button';
import PropTypes from 'prop-types';

export function Actions({ onOpenDeleteModal, onOpenEditModal, project }) {
  return (
    <div className='absolute flex flex-col gap-2 -right-4 bottom-4'>
      <Button onClick={() => onOpenEditModal(project)} variant='icon'>
        <BsPenFill size={16}/>
      </Button>

      <Button onClick={() => onOpenDeleteModal(project)} variant='icon'>
        <BsFillTrashFill size={16}/>
      </Button>
    </div>
  );
}

Actions.propTypes = {
  project: PropTypes.object.isRequired,
  onOpenDeleteModal: PropTypes.func.isRequired,
  onOpenEditModal: PropTypes.func.isRequired,
};