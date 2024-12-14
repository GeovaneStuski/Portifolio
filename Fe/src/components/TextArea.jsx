import PropTypes from 'prop-types';

export function TextArea({ label, onChange, value }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>

      <textarea
        id={label} 
        className='w-full border-emerald-main border rounded-md resize-none outline-none px-4 py-1 bg-emerald-lighter mt-2 h-32 text-sm'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};