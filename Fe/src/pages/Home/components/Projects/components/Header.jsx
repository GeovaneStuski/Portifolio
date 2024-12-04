import PropTypes from 'prop-types';

import { Button } from '../../../../../components/Button';

export function Header({ onOpenModal, showMore, onShowMore, authenticated, projectsLength }) {
  return (
    <header className="w-full flex flex-col md:flex-row gap-2 items-center justify-center md:justify-between">
      <h1 className='text-3xl md:text-4xl font-bold'>Projetos pessoais</h1>

      <div className='flex items-center gap-4'>
        {authenticated && projectsLength > 0 && (
          <Button
            variant='ghosty-small'
            onClick={onOpenModal}
          >
            Novo projeto
          </Button>
        )}

        {projectsLength > 3 && (
          <Button variant="ghosty-small" onClick={onShowMore}>
            {showMore ? 'Ver menos' : 'Ver mais'}
          </Button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  showMore: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onShowMore: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  projectsLength: PropTypes.number.isRequired,
};