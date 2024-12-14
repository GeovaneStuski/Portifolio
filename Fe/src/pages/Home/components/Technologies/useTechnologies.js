import { useContext, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';

import { DatasContext } from '../../../../contexts/DatasContext';

export function useTechnologies() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [technologyToBeDeleted, setTechnologyToBeDeleted] = useState(null);

  const { authenticated } = useContext(AuthContext);
  const { technologies, onDeleteTechnology, onCreateTechnology } = useContext(DatasContext);

  function handleOpenDeleteModal(technology) {
    setTechnologyToBeDeleted(technology);
    setIsModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsModalVisible(false);
  }

  return {
    technologies,
    isModalVisible,
    onOpenModal: handleOpenDeleteModal,
    onCloseModal: handleCloseDeleteModal,
    authenticated,
    technologyToBeDeleted,
    onDelete: onDeleteTechnology,
    onCreate: onCreateTechnology,
  };
}