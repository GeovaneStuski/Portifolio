import { getImagesFromApi } from '../../../../utils/getImagesFromApi';
import { useAbout } from './useAbout';
import { UpdateInformationModal } from '../../../../components/UpdateInformationModal';
import { ActionsStructure } from '../../../../components/ActionsStructure';
import { BsPlusCircle } from 'react-icons/bs';
import { Button } from '../../../../components/Button';

export function About() {
  const {
    text,
    image,
    onUpdate,
    isUpdateModalVisible,
    onCloseModal,
    onOpenModal,
    informationToBeUpdated,
    loading,
    authenticated,
  } = useAbout();
  
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-4 sm:gap-20" id='about'>
      <UpdateInformationModal
        onClose={onCloseModal}
        isVisible={isUpdateModalVisible}
        onUpdate={onUpdate}
        information={informationToBeUpdated}
      />

      <div>
        {!loading && (
          image ? (
            <ActionsStructure onClick={() => onOpenModal({profile_image: image})}>
              <img className='w-[512px]' src={getImagesFromApi('Profile_Picture.jpg')}/>
            </ActionsStructure>
          ) : (
            authenticated ? (
              <button onClick={() => onOpenModal({profile_image: image})} className='h-[320px] w-[320px] bg-gray-100 text-black dark:bg-white/15 dark:text-white flex items-center justify-center rounded-lg border border-white hover:bg-emerald-lighter hover:border-emerald-main hover:text-emerald-main duration-300'>
                <BsPlusCircle size={24}/>
              </button>
            ) : (
              <div className='h-[320px] w-[320px] bg-gray-100 rounded-lg dark:bg-white/15 flex items-center justify-center'>
                <span>Sem Foto</span>
              </div>
            )
          )
        )}
      </div>

      <div className="max-w-[540px] w-full flex flex-col items-center lg:items-start">
        <h1 className="text-4xl sm:text-5xl font-semibold">Sobre mim</h1>

        {text ? (
          <>
            <div className='my-10'>
              <ActionsStructure onClick={() => onOpenModal({'about_text': text})}>
                <p className='text-justify tracking-tighter hyphens-auto leading-snug text-slate-400 whitespace-pre-line pt-3'>{text}</p>
              </ActionsStructure>
            </div>
          </>
        ) : (
          authenticated && (
            <div className='w-full *:p-2 my-10'>
              <Button onClick={() => onOpenModal({'about_text': text})} variant='default-small'>Adicionar Texto</Button>
            </div>
          )
        )}
        
        <a href='#contato' className='bg-emerald-main shadow-lg px-8 py-3.5 rounded-full text-white w-fit border border-transparent hover:bg-emerald-lighter hover:border-emerald-main hover:text-emerald-main font-bold duration-300'>Contato</a>
      </div>
    </div>
  );
}