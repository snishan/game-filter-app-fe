import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/LoginPage/LoginPage'; // Adjust the path based on your file structure
import { BrowserRouter } from 'react-router-dom';
import LoginStore from '../store/login.mobx'
import userEvent from '@testing-library/user-event';

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock the LoginStore
jest.mock('../store/login.mobx', () => ({
  fieldErrors: {
    usernameError: '',
    passwordError: ''
  },
  loader: false,
  isToastVisible: false,
  toastMessage: '',
  toastType: 'success',
  isUserLogged: false,
  setPassword: jest.fn(),
  setUsername: jest.fn(),
  handleSubmit: jest.fn(),
  hideToast: jest.fn()
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    LoginStore.isUserLogged = false;
    LoginStore.fieldErrors = {
      usernameError: '',
      passwordError: ''
    };
  });

  it('calls setUsername when username input changes', async () => {
    renderLogin();
    const usernameInput = screen.getByLabelText('Login');
    
    await userEvent.type(usernameInput, 'testuser');
    expect(LoginStore.setUsername).toHaveBeenCalledTimes(8); // One call per character
  });

  it('calls setUsername when username input changes', async () => {
    renderLogin();
    const usernameInput = screen.getByLabelText('Login');

    await userEvent.type(usernameInput, 'testuser');
  
    expect(LoginStore.setUsername).toHaveBeenCalledTimes(8);
    expect(LoginStore.setUsername).toHaveBeenCalledWith('testuser'); 
  });

  it('calls setPassword when password input changes', async () => {
    renderLogin();
    const passwordInput = screen.getByLabelText('Password');
    
    await userEvent.type(passwordInput, 'password123');
    expect(LoginStore.setPassword).toHaveBeenCalledTimes(11); 
  });

  it('calls handleSubmit when login button is clicked', async () => {
    renderLogin();
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    await userEvent.click(loginButton);
    expect(LoginStore.handleSubmit).toHaveBeenCalled();
  });

  it('displays error messages when present', () => {
    LoginStore.fieldErrors = {
      usernameError: 'Username is required',
      passwordError: 'Password is required'
    };
    
    renderLogin();
    
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('redirects to dashboard when user is logged in', () => {
    LoginStore.isUserLogged = true;
    renderLogin();
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

});