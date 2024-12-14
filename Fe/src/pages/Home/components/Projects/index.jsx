import { useProject } from './useProjects';

import { ProjectModal } from './components/ProjectModal';
import { Project } from './components/Project';
import { Header } from './components/Header';
import { DeleteProjectModal } from './components/DeleteProjectModal';
import { EmptyProjectList } from './components/EmptyProjectList';

export function Projects() {
  const {
    isModalVisible,
    onCloseProjectModal,
    projects,
    authenticated,
    onShowMore,
    showMore,
    onCreate,
    onOpenDeleteModal,
    onDelete,
    projectToBeDeleted,
    isDeleteModalVisible,
    onCloseDeleteModal,
    onOpenCreateModal,
    onOpenEditModal,
    projectToBeEdit,
    onUpdate,
  } = useProject();

  return (
    <div id='projects' className="flex w-full flex-col justify-center">
      <div className='flex w-full flex-col'>
        <ProjectModal
          isVisible={isModalVisible}
          onClose={onCloseProjectModal}
          onCreate={onCreate}
          onUpdate={onUpdate}
          project={projectToBeEdit}
        />

        <DeleteProjectModal
          isVisible={isDeleteModalVisible}
          onClose={onCloseDeleteModal}
          project={projectToBeDeleted}
          onDelete={onDelete}
        />

        <Header
          onOpenModal={onOpenCreateModal}
          authenticated={authenticated}
          onShowMore={onShowMore}
          showMore={showMore}
          projectsLength={projects.length}
        />

        {projects.length > 0 ? (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-8'>
            {projects.slice(0, showMore ? projects.length : 3).map((project) => (
              <Project
                key={project.id}
                project={project}
                authenticated={authenticated}
                onOpenDeleteModal={onOpenDeleteModal}
                onOpenEditModal={onOpenEditModal}
              />
            ))}
          </div>
        ) : (
          authenticated ? (
            <EmptyProjectList onOpenModal={onOpenCreateModal} />
          ) : (
            <span className='mt-10'>Nenhum projeto!</span>
          )
        )}
      </div>
    </div>
  );
}