import { BsArrowDownCircle, BsEnvelopeFill, BsGithub, BsLinkedin, BsWhatsapp } from 'react-icons/bs';

import WhatsAppIcon from '../../../../assets/images/WhatsappLogo.png';

import { Button } from '../../../../components/Button';
import { useContact } from './useContact';
import formatPhone from '../../../../utils/formatPhone';
import { ActionsStructure } from '../../../../components/ActionsStructure';
import { UpdateInformationModal } from '../../../../components/UpdateInformationModal';
import { Header } from './components/Header';
import { useMediaQuery } from 'react-responsive';
import { getImagesFromApi } from '../../../../utils/getImagesFromApi';

export function Contact() {
  const queryToRemoveImages = useMediaQuery({ query: '(min-width: 1024px)' });

  const { 
    informations,
    isUpdateModalVisible,
    onCloseModal,
    informationToBeUpdated,
    onUpdateInformation,
    onUpdate,
  } = useContact();

  if(!informations) return;
  
  return (
    <div id='contato' className="flex justify-center lg:justify-between items-center">
      <UpdateInformationModal 
        isVisible={isUpdateModalVisible} 
        onClose={onCloseModal}
        information={informationToBeUpdated}
        onUpdate={onUpdate}
      />

      <div className='flex items-center lg:items-start flex-col gap-4'>
        <Header/>

        <ActionsStructure onClick={() => onUpdateInformation({ email: informations.email })}>
          <Button variant='only-hover'>
            <BsEnvelopeFill size={32}/>

            {informations.email}
          </Button>
        </ActionsStructure>

        <ActionsStructure onClick={() => onUpdateInformation({ phone: informations.phone })}>
          <Button variant='only-hover'>
            <BsWhatsapp size={32}/>

            {informations.phone && formatPhone(informations.phone)}
          </Button>
        </ActionsStructure>

        <ActionsStructure onClick={() => onUpdateInformation({ cv: null })}>
          <Button to={getImagesFromApi('/downloads/cv')} variant="default-fit">
            <BsArrowDownCircle size={32}/>

            Download CV
          </Button>
        </ActionsStructure>

        <nav className='flex gap-6'>
          <ActionsStructure onClick={() => onUpdateInformation({ github: informations.github })}>
            <Button to={informations.github} target='blank' variant='only-hover-rounded'>
              <BsGithub size={32}/>
            </Button>
          </ActionsStructure>

          <ActionsStructure onClick={() => onUpdateInformation({ linkedin: informations.linkedin })}>
            <Button to={informations.linkedin} target='blank' variant='only-hover-rounded'>
              <BsLinkedin className='rounded-lg' size={32}/>
            </Button>
          </ActionsStructure>
        </nav>
      </div>

      {queryToRemoveImages && <img className='w-64 h-64 animate-float' src={WhatsAppIcon} />}
    </div>
  );
}