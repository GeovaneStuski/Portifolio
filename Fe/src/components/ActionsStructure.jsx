import { BsPenFill } from 'react-icons/bs';
import { Button } from './Button';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function ActionsStructure({children, onClick}) {
  const { authenticated } = useContext(AuthContext);
  return (
    <div className='relative w-fit'>
      {children}

      {authenticated && (
        <div className='absolute dark:bg-emerald-main dark:hover:bg-transparent dark:duration-300 rounded-md -top-2 -right-2'>
          <Button onClick={onClick} variant='icon'>
            <BsPenFill size={14}/>
          </Button>
        </div>
      )}
    </div>
  );
}

ActionsStructure.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};