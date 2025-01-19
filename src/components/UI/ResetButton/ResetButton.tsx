import React from 'react';
import './styles.scss';

type ResetButtonProps = {
    label: string;
    isLoading?: boolean;
    onClick: (e?: React.FormEvent) => void;
    disabled?: boolean;
    type?: "button" | "reset" | "submit" | undefined;
    className?: string;
};

const ResetButton: React.FC<ResetButtonProps> = ({ label, isLoading = false, onClick, disabled = false, type = 'submit', className }) => {
    return (
        <button
            className={`reset-button ${isLoading ? 'loading' : ''} ${className}`}
            onClick={onClick}
            disabled={isLoading || disabled}
            type={type}
        >
            {isLoading ? <span className="loader"></span> : label}
        </button>
    );
};

export default ResetButton;
