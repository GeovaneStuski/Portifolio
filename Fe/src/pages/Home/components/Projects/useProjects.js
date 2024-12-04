import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../../contexts/AuthContext';

import { ApiRequester } from '../../../../utils/ApiRequester';

export function useProject() {
  const [projects, setProjects] = useState([]); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [projectToBeDeleted, setProjectToBeDeleted] = useState(null);
  const [projectToBeEdit, setProjectToBeEdit] = useState(null);

  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { data } = await ApiRequester.get('/projects');

      setProjects(data);
    })();
  }, []);

  function handleOpenCreateModal() {
    setProjectToBeEdit(null);
    setIsModalVisible(true);
  }

  function handleOpenEditModal(project) {
    setProjectToBeEdit(project);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  function handleShowMore() {
    setShowMore(PrevState => !PrevState);
  }

  function handleCreateProject(project) {
    setProjects(PrevState => PrevState.concat(project));
  }

  function handleOpenDeleteModal(project) {
    setIsDeleteModalVisible(true);
    setProjectToBeDeleted(project);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  function handleDeleteProject(projectId) {
    setProjects(PrevState => PrevState.filter(project => project.id !== projectId));
  }

  function handleUpdateProject(project) {
    setProjects(PrevState => {
      const itemIndex = PrevState.findIndex(prevProject => prevProject.id === project.id);

      const newProjects = PrevState;
      newProjects[itemIndex] = project;

      return newProjects;
    });

  }

  return {
    projects,
    isModalVisible,
    onOpenCreateModal: handleOpenCreateModal,
    onOpenEditModal: handleOpenEditModal,
    onCloseModal: handleCloseModal,
    authenticated,
    onShowMore: handleShowMore,
    showMore,
    onCreate: handleCreateProject,
    projectToBeDeleted,
    onDelete: handleDeleteProject,
    isDeleteModalVisible,
    onOpenDeleteModal: handleOpenDeleteModal,
    onCloseDeleteModal: handleCloseDeleteModal,
    projectToBeEdit,
    onUpdate: handleUpdateProject,
  };
}