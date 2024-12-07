import PropTypes from 'prop-types';
import cn from '../utils/cn';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const variants = {
  'ghosty-small': 'px-3 py-1 bg-emerald-main shadow-lg text-white dark:border-white dark:bg-white/15 hover:text-emerald-main hover:border-emerald-main',
  'ghosty': 'w-full max-w-[480px] h-16 px-6 flex justify-center items-center text-white bg-emerald-main shadow-lg dark:border-white dark:bg-white/15',
  'default-fit': 'bg-emerald-main shadow-lg px-5 py-3 rounded-md text-white w-fit',
  'default': 'bg-emerald-main shadow-lg h-14 w-full text-white flex items-center justify-center',
  'icon': 'dark:bg-white/15 p-1 border-white bg-emerald-main shadow-lg text-white hover:bg-gray-100 dark:hover:bg-white/10 border-transparent',
  'icon-big': 'dark:bg-white/15 p-2.5 border-white bg-emerald-main shadow-lg text-white hover:bg-gray-100 dark:hover:bg-white/10 border-transparent',
  'only-hover': 'px-5 py-3 w-fit',
  'only-hover-rounded': 'p-2 w-fit rounded-full'
};

const baseStyle = 'flex gap-2 items-center enabled:hover:bg-emerald-lighter border enabled:hover:border-emerald-main enabled:hover:text-emerald-main rounded-md duration-300 border-transparent dark:disabled:bg-emerald-lighter dark:disabled:text-white/35 disabled:hover:none disabled:bg-emerald-main/50';

// focus-within:bg-emerald-lighter focus-within:border-emerald-main focus-within:text-emerald-main

export function Button({
  children,
  type = 'button',
  variant,
  to = null,
  onClick = null,
  disabled = false,
  loading = false,
  target = null
}) {
  return (
    <>
      {!to && (
        <button 
          type={type}
          onClick={onClick}
          className={cn(baseStyle, variants[variant])}
          disabled={disabled || loading}
        >
          {loading && <FaSpinner className='animate-spin'/>}

          {!loading && children}
        </button>
      )}

      {to && (
        <Link className={cn(baseStyle, variants[variant])} target={target} to={to}>
          {children}
        </Link>
      )}
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default-fit', 'default', 'icon', 'ghosty', 'ghosty-small', 'icon-big', 'only-hover', 'only-hover-rounded', 'default-small']).isRequired,
  to: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'button']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  target: PropTypes.string,
};