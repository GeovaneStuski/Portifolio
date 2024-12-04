import { useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';

import { BsBoxArrowInRight , BsPersonCircle  } from 'react-icons/bs';

import { Button } from '../../../components/Button';

export function Header() {
  const { authenticated, user, onLogout } = useContext(AuthContext);

  return (
    <header className='absolute right-1/2 translate-x-1/2 top-8 sm:translate-x-0 sm:right-8'>
      {!authenticated && (
        <Button
          to='/login'
          variant="ghosty-small"
        >
          Login
        </Button>
      )}

      {authenticated && (
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <BsPersonCircle size={24}/>

            <span className='font-semibold'>{user}</span>
          </div>

          <Button variant='ghosty-small' onClick={onLogout}>
            <BsBoxArrowInRight  size={24}/>

            Deslogar
          </Button>
        </div>
      )}
    </header>
  );
}