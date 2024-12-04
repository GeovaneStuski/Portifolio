import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { BsBoxArrowInUp } from 'react-icons/bs';

import { getImagesFromApi } from '../utils/getImagesFromApi';

export function FileInput({ onChange, value, expectType }) {
  const [isOnDragzone, setIsOnDragzone] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);

  const dropZoneRef = useRef(null);

  const dropzoneLabel = isOnDragzone ? 'Solte o Arquivo!' : 'Arraste o Arquivo ou clique no botão abaixo!';

  useEffect(() => {
    if(!dropZoneRef) return;

    function handleClick() {
      onChange(null);
      setIsOnDragzone(false);
      setWrongFileType(false);
    }

    function handleDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];

      if(expectType === 'image' && !file.type.includes('jp') || expectType === 'cv' && !file.type.includes('pdf')) {
        setWrongFileType(true);
        return;
      }

      onChange(file);
    }

    function handleDragover(event) {
      event.preventDefault();
      setIsOnDragzone(true);
      onChange(null);
    }

    function handleDragleave(event) {
      event.preventDefault();
      setIsOnDragzone(false);
    }

    dropZoneRef.current.addEventListener('drop', handleDrop);
    dropZoneRef.current.addEventListener('dragover', handleDragover);
    dropZoneRef.current.addEventListener('click', handleClick);
    dropZoneRef.current.addEventListener('dragleave', handleDragleave);
    return () => {
      dropZoneRef.current?.removeEventListener('drop', handleDrop);
      dropZoneRef.current?.removeEventListener('dragover', handleDragover);
      dropZoneRef.current?.removeEventListener('click', handleClick);
      dropZoneRef.current?.removeEventListener('dragleave', handleDragleave);
    };
  }, [dropZoneRef]);

  function handleChange(file) {
    onChange(file);
  }
  
  return (
    <div className='w-full border border-dashed border-emerald-main rounded-lg flex flex-col'>
      <div 
        ref={dropZoneRef}
        className='h-44 flex items-center justify-center flex-col gap-2 cursor-pointer text-center'>
        {!value && (
          <div className='flex flex-col gap-2 items-center'>
            {!wrongFileType && (
              <>
                <BsBoxArrowInUp size={32}/>

                <span>{dropzoneLabel}</span>
              </>
            )}

            {wrongFileType && 'Tipo de arquivo errado'}
          </div>
        )}

        {value && (
          typeof value === 'object' ? (
            value?.type.includes('image') ? (
              <img className='h-full' src={URL.createObjectURL(value)} />
            ) : (
              <span>{value.name}</span>
            )
          ) : (
            <img className='h-full' src={getImagesFromApi(value)} />
          )
        )}
      </div>

      <label 
        className='w-full bg-emerald-main h-12 flex items-center justify-center hover:bg-emerald-lighter duration-300 border-t border-dashed border-transparent hover:text-emerald-main hover:border-emerald-main text-white' 
        htmlFor='file-inpt'>Upload</label>

      <input 
        onChange={(event) => handleChange(event.target.files[0])}
        accept={expectType === 'image' ? 'image/jpeg' : 'application/pdf'}
        id='file-inpt' 
        type="file" 
        hidden 
      />
    </div>
  );
}

FileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  expectType: PropTypes.oneOf(['cv', 'image', 'profile_image']),
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};