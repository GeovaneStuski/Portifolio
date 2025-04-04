import PropTypes from 'prop-types';

import { Header } from './components/Header';
import { Actions } from './components/Actions';

import { formatList } from '../../../../../../utils/formatList';
import { getImagesFromApi } from '../../../../../../utils/getImagesFromApi';
import { FaSpinner } from 'react-icons/fa';
import { useProject } from './useProject';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../../../../../contexts/ThemeContext';
import cn from '../../../../../../utils/cn';

export function Project({ project, authenticated, onOpenDeleteModal, onOpenEditModal }) {
  const [seeMore, setSeeMore] = useState(false);

  const { 
    imageLoaded,
    loading,
    timestamp
  } = useProject({ project });

  const projectRef = useRef();
  
  const { theme } = useContext(ThemeContext);

  const splitDescription = project?.description?.split('\n') || [];

  useEffect(() => {
    function handleClick(event) {
      if(projectRef.current && !projectRef.current.contains(event.target)) {
        setSeeMore(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [projectRef]);

  return (
    <div ref={projectRef} className='w-full shadow-all-sides h-fit shadow-black/60 rounded-lg relative'>
      <div className="h-56 flex items-center justify-center bg-zinc-200 p-6 rounded-t-lg">
        {loading && <FaSpinner size={32} className='text-emerald-main animate-spin'/>}
        
        <img 
          hidden={loading} 
          className='h-full max-h-40 rounded-lg' 
          onLoad={imageLoaded} 
          src={getImagesFromApi(`/projects/${project.id}/image?timestamp=${timestamp}`)}
          alt={project?.title || 'Project Image'}
        />
      </div>

      <div className='p-4 w-full'>
        <Header project={project}/>

        <div className='relative pb-4'>
          <div className={cn('my-4 text-slate-400 space-y-4 text-justify tracking-tighter leading-snug hyphens-auto break-words', !seeMore && 'line-clamp-6 space-y-1')}>
            {splitDescription.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

          <button onClick={() => setSeeMore(prevState => !prevState)} data-theme={theme} className='absolute bottom-1.5 hover:text-emerald-400 right-0 text-sm'>{seeMore ? 'Ver menos' : 'Ver mais'}</button>
        </div>


        <span className='text-[15px]'>{formatList(project?.technologies?.map(tech => tech.name) || [])}</span>
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
