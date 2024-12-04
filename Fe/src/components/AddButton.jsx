import PropTypes from 'prop-types';

import { BsPlusCircle } from 'react-icons/bs';

import { Button } from './Button';


export function AddButton({ onClick }) {
  return (
    <Button variant='ghosty' onClick={onClick}>
      <BsPlusCircle size={24}/>
    </Button>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};