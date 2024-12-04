import { useContext } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../contexts/ThemeContext';

import { FaCircleNotch } from 'react-icons/fa';

import { useUnmount } from '../hooks/useUnmount';
import cn from '../utils/cn';

export function Loader({isVisible}) {
  const { itemRef, shouldBeRender } = useUnmount({isVisible});

  const { theme } = useContext(ThemeContext);

  if(!shouldBeRender) return;

  return (
    <div ref={itemRef} className={cn('fixed z-10 top-0 left-0 w-screen h-screen bg-gradient-to-br from-gray-900 via-gray-800 via-80% to-gray-900 flex flex-col gap-4 items-center justify-center text-emerald-main', {
      'animate-fade-out': !isVisible,
      'from-white via-gray-100 to-white text-black': theme === 'light'
    })}>
      <FaCircleNotch className='animate-spin text-emerald-main' size={64}/>
      <span className='animate-pulse text-lg'>Carregando...</span>
    </div>
  );
}

Loader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};