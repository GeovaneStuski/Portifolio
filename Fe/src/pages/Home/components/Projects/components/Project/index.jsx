import PropTypes from 'prop-types';

import { Header } from './components/Header';
import { Actions } from './components/Actions';

import { formatList } from '../../../../../../utils/formatList';
import { getImagesFromApi } from '../../../../../../utils/getImagesFromApi';
import { FaSpinner } from 'react-icons/fa';
import { useProject } from './useProject';

export function Project({ project, authenticated, onOpenDeleteModal, onOpenEditModal }) {
  const { 
    imageLoaded,
    loading,
    timestamp
  } = useProject({ project });

  return (
    <div className='h-full w-full shadow-all-sides shadow-black/60 rounded-lg relative'>
      <div className="h-full flex items-center justify-center bg-zinc-200 p-6 max-h-60 rounded-t-lg">
        {loading && <FaSpinner size={32} className='text-emerald-main animate-spin'/>}
        
        <img hidden={loading} className='h-full' onLoad={imageLoaded} src={getImagesFromApi(`/projects/${project.id}/image?timestamp=${timestamp}`)}/>
      </div>

      <div className='p-4 w-full'>
        <Header project={project}/>

        <p className='my-4 text-slate-400 text-justify tracking-tighter leading-snug hyphens-auto break-words'>{project.description}</p>

        <span>{formatList(project.technologies.map(technology => technology.name))}</span>
      </div>

      {authenticated && (
        <Actions 
          project={project} 
          onOpenDeleteModal={onOpenDeleteModal} 
          onOpenEditModal={onOpenEditModal}
        />
      )}
    </div>
  );
}

Project.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagepath: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    repositorylink: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
  onOpenEditModal: PropTypes.func.isRequired,
  onOpenDeleteModal: PropTypes.func.isRequired,
};