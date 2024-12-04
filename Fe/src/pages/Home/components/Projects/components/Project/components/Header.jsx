import PropTypes from 'prop-types';
import { BsGithub } from 'react-icons/bs';

export function Header({ project }) {
  return (
    <header className='w-full flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>{project.title}</h1>

      <a target='blank' href={project.repositorylink}>
        <BsGithub size={24}/>
      </a>
    </header>
  );
}

Header.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    repositorylink: PropTypes.string.isRequired,
  }).isRequired,
};