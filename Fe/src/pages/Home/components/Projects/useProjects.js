import { useContext, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';

import { DatasContext } from '../../../../contexts/DatasContext';

export function useProject() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [projectToBeDeleted, setProjectToBeDeleted] = useState(null);
  const [projectToBeEdit, setProjectToBeEdit] = useState(null);

  const { authenticated } = useContext(AuthContext);

  const { projects, onCreateProject, onUpdateProject, onDeleteProject } = useContext(DatasContext);

  function handleOpenCreateModal() {
    setProjectToBeEdit(null);
    setIsModalVisible(true);
  }

  function handleOpenEditModal(project) {
    setProjectToBeEdit(project);
    setIsModalVisible(true);
  }

  function handleCloseProjectModal() {
    setIsModalVisible(false);
  }

  function handleShowMore() {
    setShowMore(PrevState => !PrevState);
  }

  function handleOpenDeleteModal(project) {
    setIsDeleteModalVisible(true);
    setProjectToBeDeleted(project);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  return {
    projects,
    onCreate: onCreateProject,
    onUpdate: onUpdateProject,
    onDelete: onDeleteProject,
    isModalVisible,
    onOpenCreateModal: handleOpenCreateModal,
    onOpenEditModal: handleOpenEditModal,
    onCloseProjectModal: handleCloseProjectModal,
    authenticated,
    onShowMore: handleShowMore,
    showMore,
    projectToBeDeleted,
    isDeleteModalVisible,
    onOpenDeleteModal: handleOpenDeleteModal,
    onCloseDeleteModal: handleCloseDeleteModal,
    projectToBeEdit,
  };
}