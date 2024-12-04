import PropTypes from 'prop-types';

import { BsFillRecord2Fill, BsFillTrashFill } from 'react-icons/bs';

import { Button } from '../../../../../components/Button';

export function Technology({ technology, authenticated, onOpenDeleteModal }) {
  return (
    <div className='h-16 w-full shadow-all-sides font-semibold shadow-black/60 rounded-md flex items-center px-6 gap-6 relative'>
      <BsFillRecord2Fill className='text-emerald-main' size={48}/>

      <span>{technology.name}</span>

      {authenticated && (
        <div className='absolute -top-2 right-2 flex gap-2'>
          <Button onClick={() => onOpenDeleteModal(technology)} variant='icon'>
            <BsFillTrashFill size={16}/>
          </Button>
        </div>
      )}
    </div>
  );
}

Technology.propTypes = {
  technology: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
  onOpenDeleteModal: PropTypes.func.isRequired,
};