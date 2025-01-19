import React, { useState, InputHTMLAttributes } from 'react';
import { EyeIcon } from '../Icons/EyeIcon';
import { EyeOffIcon } from '../Icons/EyeOffIcon';
import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: 'text' | 'password';
  name?: string;
  id?:string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  className = '',
  placeholder = '',
  name = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(Boolean(props.value));

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasContent(Boolean(e.target.value));
    props.onChange?.(e);
  };

  const isLabelActive = isFocused || hasContent || Boolean(placeholder);

  return (
    <div className={`input-container ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={name} className={`input-label ${isLabelActive ? 'active' : ''}`}>
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          {...props}
          placeholder={placeholder}
          type={inputType}
          className={`input-field ${className}`}
          onChange={handleInputChange}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          name={name}
          id={id??name}
          autoComplete="off"
          readOnly={!isFocused ? true : false}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOffIcon className="icon" />
            ) : (
              <EyeIcon className="icon" />
            )}
          </button>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;