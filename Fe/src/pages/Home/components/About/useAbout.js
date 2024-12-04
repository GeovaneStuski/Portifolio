import { useContext, useEffect, useState } from 'react';
import { ApiRequester } from '../../../../utils/ApiRequester';
import { AuthContext } from '../../../../contexts/AuthContext';

export function useAbout() {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [informationToBeUpdated, setInformationToBeUpdated] = useState(null);
  const [text, setText] = useState('');
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ApiRequester.get('/informations');
        await ApiRequester.get('/uploads/Profile_Picture.jpg');

        setText(data.about_text);
        setImage('Profile_Image.jpg');
      } catch(err) {
        if(err.status === 404) {
          setImage(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleOpenModal(information) {
    setInformationToBeUpdated(information);
    setIsUpdateModalVisible(true);
  }

  function handleCloseModal() {
    setIsUpdateModalVisible(false);
  }

  function handleUpdate(information) {
    if(information instanceof File) {
      setImage(information);
    } else {
      setText(information.about_text);
    }
  }

  return {
    loading,
    text,
    image,
    onUpdate: handleUpdate,
    isUpdateModalVisible,
    onOpenModal: handleOpenModal,
    onCloseModal: handleCloseModal,
    informationToBeUpdated,
    authenticated
  };
}