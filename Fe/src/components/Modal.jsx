import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { BsX } from 'react-icons/bs';

import { Button } from './Button';

import { useUnmount } from '../hooks/useUnmount';
import cn from '../utils/cn';
import { useEffect, useRef } from 'react';

export function Modal({
  isVisible,
  title,
  onClose,
  confirmLabel,
  onConfirm,
  children,
  size = 560,
  isLoading = false,
  disabled = false,
}) {
  const { itemRef, shouldBeRender } = useUnmount({isVisible});
  const containerRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    if(containerRef.current) {
      containerRef.current?.addEventListener('keydown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if(containerRef.current) {
        containerRef.current?.removeEventListener('keydown', handleClickOutside);
      }
    };
  }, [isVisible]);
  
  if(!shouldBeRender) return;

  return createPortal((
    <div ref={itemRef} className={cn('fixed flex justify-center px-2 sm:px-0 items-center bg-black/60 top-0 left-0 w-full h-full', {
      'animate-fade-in': isVisible,
      'animate-fade-out': !isVisible
    })}>
      <div 
        className={cn('w-full bg-white p-8 rounded-xl dark:bg-gray-900', {
          'animate-scale-in': isVisible,
          'animate-scale-out': !isVisible,
        })} 
        style={{
          maxWidth: `${size}px`
        }}
        ref={containerRef}
      >
        <header className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>{title}</h1>

          <button onClick={onClose}>
            <BsX size={24} />
          </button>
        </header>
        
        <div className='my-8'>
          {children}
        </div>

        <footer className='flex items-center justify-between'>
          <Button
            onClick={onConfirm}
            variant='default'
            loading={isLoading}
            disabled={disabled}
          >
            {confirmLabel}
          </Button>
        </footer>
      </div>
    </div>
  ), document.getElementById('modal-root'));
}

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};