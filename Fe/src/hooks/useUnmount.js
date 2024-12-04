import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

export function useUnmount({isVisible}) {
  const [shouldBeRender, setShouldBeRender] = useState(false);

  const itemRef = useRef(null);

  useEffect(() => {
    async function handleAnimationEnd() {
      setShouldBeRender(false);
    }

    if(!isVisible) {
      itemRef.current?.addEventListener('animationend', handleAnimationEnd);
    }

    if(isVisible) {
      setShouldBeRender(true);
    }
  }, [isVisible, itemRef]);

  return {
    shouldBeRender,
    itemRef,
  };
}

useUnmount.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};