import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { BsFillRecord2Fill, BsPlusCircle, BsSend } from 'react-icons/bs';

import { toast } from 'react-toastify';

import { ApiRequester } from '../utils/ApiRequester';
import cn from '../utils/cn';

export function AddButtonTechnology({ onCreate }) {
  const [isInAddMode, setIsInAddMode] = useState(false);
  const [value, setValue] = useState('');

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if(event.key === 'Escape') {
        setIsInAddMode(false);
      }

      if(event.key === 'Enter') {
        handleCreateTechnology();
      }
    }

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsInAddMode(false);
      }
    } 

    inputRef.current?.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      inputRef.current?.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInAddMode, value]);

  useEffect(() => {
    inputRef.current?.focus();
    setValue('');
  }, [isInAddMode]);

  function handleChangeValue(event) {
    setValue(event.target.value);
  }

  async function handleCreateTechnology() {
    try {
      const { data } = await ApiRequester.post('/technologies', {
        name: value,
      });

      onCreate(data);

      setIsInAddMode(false);
      setValue('');
      toast.success('Technolgia cadastrada!');
    } catch {
      toast.error('Erro ao cadastrar a technologia');
    }
  }
  
  return (
    <div 
      onClick={() => setIsInAddMode(true)}
      className={cn(
        'dark:bg-white/15 w-full h-16 flex items-center justify-center border border-transparent bg-emerald-main text-white dark:border-white rounded-md cursor-pointer hover:bg-emerald-lighter hover:text-emerald-main hover:border-emerald-main duration-300 px-4 gap-2', {
          '!bg-emerald-lighter !border-emerald-main !text-emerald-main': isInAddMode,
        }
      )}
      ref={containerRef}
    >
      {isInAddMode && (
        <>
          <BsFillRecord2Fill size={56}/>

          <input 
            ref={inputRef} 
            className='dark:bg-emerald-main/20 bg-emerald-main/50 text-black shadow-lg dark:text-white outline-none w-full py-1 px-4 rounded-md'
            onChange={handleChangeValue}
            value={value}
          />

          {value && (
            <button 
              onClick={handleCreateTechnology} 
              className='rotate-45'
            >
              <BsSend size={24}/>
            </button>
          )}
        </>
      )}

      {!isInAddMode && (
        <BsPlusCircle size={24}/>
      )}
    </div>
  );
}

AddButtonTechnology.propTypes = {
  onCreate: PropTypes.func.isRequired,
};