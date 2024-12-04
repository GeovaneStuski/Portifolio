import PropTypes from 'prop-types';
import { BsEyeFill, BsEyeSlashFill  } from 'react-icons/bs';
import { useState } from 'react';

export function Input({ type = 'text', label, onChange, value, placeholder }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleChangePasswordVisible() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <>
      <label htmlFor={label}>{label}</label>

      <div className='relative'>
        <input 
          id={label} 
          type={type === 'password' ? isPasswordVisible ? 'text' : 'password' : type} 
          className="bg-emerald-lighter text-sm border border-emerald-light rounded-md h-14 w-full outline-none px-4 focus:border-emerald-main duration-300"
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />

        {type === 'password' && (
          <button onClick={handleChangePasswordVisible} type='button' className='absolute top-1/2 -translate-y-1/2 right-3'>
            {isPasswordVisible && (
              <BsEyeFill  size={22}/>
            )}

            {!isPasswordVisible && (
              <BsEyeSlashFill  size={22}/>
            )}
          </button>
        )}
      </div>
    </>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(['password']),
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};