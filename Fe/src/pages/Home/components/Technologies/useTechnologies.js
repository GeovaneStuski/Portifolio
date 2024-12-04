import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';

import { ApiRequester } from '../../../../utils/ApiRequester';

export function useTechnologies() {
  const [technologies, setTechnologies] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [technologyToBeDeleted, setTechnologyToBeDeleted] = useState(null);

  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { data } = await ApiRequester.get('/technologies');

      setTechnologies(data);
    })();
  }, []);

  function handleOpenDeleteModal(technology) {
    setTechnologyToBeDeleted(technology);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleDeleteTechnology(technologyId) {
    setTechnologies(PrevState => PrevState.filter((technology) => technology.id !== technologyId));
  }

  function handleCreateTechnology(technology) {
    setTechnologies(PrevState => PrevState.concat(technology));
  }

  return {
    technologies,
    isDeleteModalVisible,
    onOpenDeleteModal: handleOpenDeleteModal,
    onCloseDeleteModal: handleCloseDeleteModal,
    authenticated,
    technologyToBeDeleted,
    onDelete: handleDeleteTechnology,
    onCreate: handleCreateTechnology,
  };
}