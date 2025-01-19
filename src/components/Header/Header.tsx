import React from 'react';
import User from '../../assets/icons/user_icon.svg';
import './styles.scss';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="header-section">
      <div className="header-container">
        <div className="logo">
          <img src="./images/logo.svg"/>
        </div>
        <button 
          className="logout-button" 
          onClick={onLogout}
        >
          <img className="logout-icon" src={User}/>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;