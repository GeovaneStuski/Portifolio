import PropTypes from 'prop-types';

import { BsSquare, BsCheckSquare, BsFillRecord2Fill } from 'react-icons/bs';

import cn from '../../../../../../../utils/cn';

export function Technology({ technology, technologiesList, onChangeTechnology }) {
  return (
    <button 
      onClick={() => onChangeTechnology(technology.id)} 
      className={cn('h-16 flex items-center px-4 w-full rounded-md bg-zinc-100 font-semibold justify-between dark:bg-white/10', {
        'bg-emerald-lighter border border-emerald-main text-emerald-main': technologiesList.includes(technology.id)
      })}
    >
      <div className='flex gap-4 items-center'>
        <BsFillRecord2Fill size={44}/>

        <span>{technology.name}</span>
      </div>

      {technologiesList.includes(technology.id) ? (
        <BsCheckSquare size={18}/>
      ) : (
        <BsSquare size={18}/>
      )}
    </button>
  );
}

Technology.propTypes = {
  technologiesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeTechnology: PropTypes.func.isRequired,
  technology: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};