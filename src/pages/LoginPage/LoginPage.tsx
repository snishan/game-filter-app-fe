import React from 'react';
import InputField from '../../components/UI/InputField/InputField';
import Button from '../../components/UI/Button/Button';
import LoginStore from '../../store/login.mobx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/UI/Toast/Toast';
import "./styles.scss"

const Login: React.FC = observer(() => {
  const navigate = useNavigate();
  const {
    fieldErrors,
    loader,
    isToastVisible,
    toastMessage,
    toastType,
    isUserLogged,
    setPassword,
    setUsername,
    handleSubmit,
    hideToast,
  } = LoginStore;

  const handleLoginSubmit = () => {
    handleSubmit(() => {
      navigate('/dashboard');
    });
  };

  if (isUserLogged) {
    navigate('/dashboard');
  }

  return (
    <div className="login-container">
      <div className='container'>
        <img className='logo-icon' src='./images/logo.svg' alt='logo-icon' />
        <form >
          <InputField
            type='text'
            label='Login'
            name='username'
            error={fieldErrors.usernameError}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type='password'
            label='Password'
            name='password'
            error={fieldErrors.passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button isLoading={loader} label='Login' onClick={handleLoginSubmit} type='button' />
        </form>
      </div>
      {isToastVisible && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={hideToast}
        />
      )}
    </div>
  );
});

export default Login;