import PropTypes from 'prop-types';

import { BsFillImageFill } from 'react-icons/bs';

import { getImagesFromApi } from '../../../../../../../utils/getImagesFromApi';

export function ImageContainer({image, onChangeImage}) {
  return (
    <div className='w-full rounded-lg h-full flex flex-col border border-emerald-light'>
      <div className='flex bg-gradient-to-br from-transparent to-white/10 flex-1 justify-center items-center'>
        {!image && <BsFillImageFill size={24}/>}
              
        {image && <img className='h-full max-h-48' src={typeof image === 'string' ? getImagesFromApi(image) : URL.createObjectURL(image)} />}
      </div>

      <div> 
        <label 
          htmlFor='image-inpt' 
          className='cursor-pointer bg-emerald-main hover:bg-emerald-lighter border-t rounded-md hover:text-emerald-main duration-300 border-transparent hover:border-emerald-main w-full h-12 flex justify-center items-center text-white'
        >
          Adicionar imagem
        </label>

        <input 
          accept="image/png, image/jpeg" 
          onChange={onChangeImage}
          id='image-inpt'
          className='hidden'
          type="file" 
        />
      </div>
    </div>
  );
}

ImageContainer.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  onChangeImage: PropTypes.func.isRequired,
};