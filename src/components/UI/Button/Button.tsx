import React from 'react';
import './styles.scss';

type ButtonProps = {
    label: string;
    isLoading?: boolean;
    onClick?: (e?: React.FormEvent) => void;
    disabled?: boolean;
    type?: "button" | "reset" | "submit" | undefined;
};

const Button: React.FC<ButtonProps> = ({ label, isLoading = false, onClick, disabled = false, type = 'button' }) => {
    return (
        <button
            className={`custom-button ${isLoading ? 'loading' : ''}`}
            onClick={onClick}
            disabled={isLoading || disabled}
            type={type}
        >
            {isLoading ? <span className="loader"></span> : label}
        </button>
    );
};

export default Button;
